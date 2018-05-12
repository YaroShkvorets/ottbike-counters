
const optionsYears = {
	chart: {
				renderTo: 'container_years',
				type: 'line',
				zoomType: 'xy'
			},
	title: {
		text: 'Bike Lane'
	},
	legend: {
          enabled: false
      },
	xAxis: {
	   gridLineWidth: 1,
	   tickPositions: [0,31,59,90,120,151,181,212,243,273,304,334,365],
	   labels: {
			formatter: function() {
				return GetMonthFromDayNum(this.value);
			},
		},
		crosshair: true

	},
	yAxis: {
          title: {
              text: null
          },

		labels: {
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
		max:500000,

	},
	tooltip: {
    shared: true,
		useHTML: true,
		headerFormat: '<span style="font-size:10px">Day {point.x}</span>',
		formatter: function () {
              return TooltipFormatter(this, false);
          }
      },
	series: []
};

const optionsMonths = {
	chart: {
		type: 'column',
		renderTo: 'container_months',
	},
	title: {
		text: null
	},
	xAxis: {
		categories: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		],
		crosshair: true
	},
	yAxis: {
		min: 0,
		title: {
			text: null
		},
		crosshair: true
	},
	tooltip: {
		shared: true,
		//crosshairs: true,
		valueSuffix: ' rides',
		useHTML: true
	},
	plotOptions: {
		column: {
			pointPadding: 0.1,
			borderWidth: 0
		}
	},
	series: []
};


const optionsDays = {

	chart: {
		type: 'column',
		renderTo: 'container_days'
	},
	legend: {
          enabled: false
      },
	title: {
		text: null
	},
	xAxis: {
		type: 'datetime',
		plotBands: []

	},
	yAxis: {
		min: 0,
		title: {
			text: null
		},
		crosshair: true,
		gridLineWidth: 0,
		plotLines: []
	},
	tooltip: {
		shared: true,
		useHTML: true
	},
	plotOptions: {
		column: {
			pointPadding: 0.1,
			borderWidth: 1
		}
	},
	series: []
};

const optionsWeeks = {

	chart: {
		type: 'column',
		renderTo: 'container_weeks'

	},
	legend: {
          enabled: false
      },
	title: {
		text: null
	},
	xAxis: {
		type: 'datetime',
		plotBands: []

	},
	yAxis: {
		title: {
			text: null
		},
		crosshair: true,
		plotLines: [],
		min: 0,
		max: 20000
	},
	tooltip: {
		shared: true,
		useHTML: true
	},
	plotOptions: {
		column: {
			pointPadding: 0.1,
			borderWidth: 1
		}
	},
	series: []
};

let chartYears, chartMonths, chartDays, chartWeeks;


const DaysSeries = {
            name: 'Day total',
            data: []
        };

const WeeksSeries = {
            name: 'Week total',
            data: []
        };
const ThisWeekSeries = {
            name: 'This week total',
            color: '#ffa126',
            data: []
        };
let MonthDayRecords = []
let DayOfWeekRecords = []
let MonthWeekRecords = []
let Years = []
let todayTotals = [];

const now = new Date();


function getSortedPointsKeys(points) {
    const keys = []; for(let key in points) keys.push(key);
    return keys.sort(function(a,b){return points[b].y-points[a].y});
}

function getSortedKeys(obj) {
    const keys = []; for(let key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}


function TooltipFormatter(tooltip) {

	const sortedPoints = getSortedPointsKeys(tooltip.points);

  // Create the header with reference to the time interval
  const index = tooltip.points[0].point.index;
  let ret = '<small>' + GetDayMonthFromDayNum(tooltip.x) + '</small><br><table>';

	for(let key in sortedPoints)
	{
    const series = tooltip.points[sortedPoints[key]].series;
		const yearShow = tooltip.points[sortedPoints[key]].y;		//whichever year we are showing
		const yearCur = tooltip.points[tooltip.points.length-1].y;		//2017
		let diff = '<span style="font-size: 75%;">' + (yearCur>yearShow?' (':' (+');
		diff+=Highcharts.numberFormat(yearShow-yearCur,0)+') </span>';
		if(yearShow==yearCur) diff='';

		ret += '<tr><td><span style="color:' + series.color + ';">\u25CF</span> ' + series.name +
			': </td><td style="margin:0;white-space:nowrap"><b>' + Highcharts.numberFormat(yearShow,0) +
			'</b></td><td>'+ diff +'</td></tr>';
  }

  ret += '</table>';

  return ret;
};


function GetDayMonthFromDayNum(daynum)
{
	const date = new Date(new Date(2018, 0).setDate(daynum+1)); // add the number of days
	return Highcharts.dateFormat('%b %e', date.getTime())
};

function GetMonthFromDayNum(daynum)
{
	const date = new Date(new Date(2018, 0).setDate(daynum+1)); // add the number of days
	return Highcharts.dateFormat('%b', date.getTime())
};


function renderYearsTextBox(todayTotals)
{
	const curYear = todayTotals.length-1
	const sortedYears = getSortedKeys(todayTotals);

	let labelText = 'To this day:<br>';

	for(let key in sortedYears)
	{
		const year = sortedYears[key];
		const series = chartYears.get(parseInt(year));
		let diff = '<span style="font-size: 75%;">' + (todayTotals[curYear]>todayTotals[sortedYears[key]]?' (':' (+');
		diff+=Highcharts.numberFormat(todayTotals[sortedYears[key]]-todayTotals[curYear],0)+') </span>';
		if(curYear==sortedYears[key]) diff='';

		labelText+= '<span style="color:' + series.color + ';">\u25CF</span> ' + sortedYears[key] +
			': <span style="display: inline-block;width: 240px;"><b>' + Highcharts.numberFormat(todayTotals[sortedYears[key]],0)+' </b></span>'+diff+'<br>';

	}

	//now draw legend box in the top left corner
	chartYears.renderer.text(labelText, 80, 80)
		.attr({
			zIndex: 5
		})
		.css({
		fontSize: '12px'
	})
	.add();

};


function AddRecordsLines()
{

  const lastDayTime = DaysSeries.data[DaysSeries.data.length-1][0];

	const monthOfYear = new Date(lastDayTime+24*60*60*1000).getMonth()+1;	//check one day into future because timezones
	const dayOfWeek = new Date(lastDayTime).getDay();
	const MonthRecord = MonthDayRecords[monthOfYear];
	const DayOfWeekRecord = DayOfWeekRecords[dayOfWeek];
	const MonthWeekRecord = MonthWeekRecords[monthOfYear];
	//this month record line
	optionsDays.yAxis.plotLines.push(
											{
												value: MonthRecord.rides,
												color: 'grey',
												width: 1,
												dashStyle: 'Dot',
												label: {
													useHTML: true,
													text: Highcharts.dateFormat("Busiest %B",lastDayTime)+' day ever: <b>'+ MonthRecord.rides + '</b> on ' + Highcharts.dateFormat("%Y-%m-%d",MonthRecord.time),
													style: {
														color: 'grey',
														fontSize: '11px'
													},
													x:0,
													y: MonthRecord.rides>DayOfWeekRecord.rides?-5:12
												}
											});
	//this day of week record line
	optionsDays.yAxis.plotLines.push(
											{
												value: DayOfWeekRecord.rides,
												color: 'grey',
												width: 1,
												dashStyle: 'Dot',
												label: {
													useHTML: true,
													text: Highcharts.dateFormat("Busiest %A",lastDayTime)+' ever: <b>'+ DayOfWeekRecord.rides + '</b> on ' + Highcharts.dateFormat("%Y-%m-%d",DayOfWeekRecord.time),
													style: {
														color: 'grey',
														fontSize: '11px'
													},
													x:0,
													y: (MonthRecord.rides>DayOfWeekRecord.rides && MonthRecord.rides-DayOfWeekRecord.rides<500)?12:-5
												}
											});

											//this month week record line
	optionsWeeks.yAxis.plotLines.push(
											{
												value: MonthWeekRecord.rides,
												color: 'grey',
												width: 1,
												dashStyle: 'Dot',
												label: {
													useHTML: true,
													text: Highcharts.dateFormat("Busiest <b>%B",lastDayTime)+'</b> week ever: <b>'+ MonthWeekRecord.rides + '</b> on ' + Highcharts.dateFormat("%Y-%m-%d",MonthWeekRecord.time),
													style: {
														color: 'grey',
														fontSize: '11px'
													},
													x:0,
													y: 12
												}
											});

};



$(document).ready(function(){

	jQuery.ajaxSetup({async:false});

	$('#laurier').click(function (){
    showCounter('Laurier Bike Lane', 'laurier.csv')
  });

  $('#portage').click(function (){
		showCounter('Portage Bike Lane', 'portage.csv')
  });

  showCounter('Laurier Bike Lane', 'laurier.csv')

})

function destroyCharts(){
	if (typeof chartDays != 'undefined') chartDays.destroy();
	if (typeof chartMonths != 'undefined') chartMonths.destroy();
	if (typeof chartYears != 'undefined') chartYears.destroy();
	if (typeof chartWeeks != 'undefined') chartWeeks.destroy();

	Years = []
	DaysSeries.data=[]
	WeeksSeries.data=[]
	ThisWeekSeries.data=[]
	MonthDayRecords = []
	DayOfWeekRecords = []
	MonthWeekRecords = []
	todayTotals = []
	optionsYears.series = []
	optionsMonths.series = []
	optionsDays.series = []
	optionsWeeks.series = []
	optionsDays.yAxis.plotLines = []
	optionsWeeks.yAxis.plotLines = []
}

function showCounter(name, filename){

	destroyCharts()
  parseBikeData(filename, Years)

  const todayPoint = Years[Years.length-1].daily.length-1;

  for(let year of Years){
      optionsYears.series.push({id:year.year, name:year.year, data: year.daily});
      optionsMonths.series.push({id:year.year, name:year.year, data: year.monthly});
      todayTotals[year.year] = year.daily[todayPoint];
  }
  optionsDays.series.push(DaysSeries);
  ThisWeekSeries.data.push(WeeksSeries.data[WeeksSeries.data.length-1]);
  WeeksSeries.data.length = WeeksSeries.data.length-1;
  optionsWeeks.series.push(WeeksSeries);
  optionsWeeks.series.push(ThisWeekSeries);
	optionsYears.title.text = name

  AddRecordsLines();

  chartYears = new Highcharts.Chart(optionsYears);
  chartMonths = new Highcharts.Chart(optionsMonths);
  chartDays = new Highcharts.Chart(optionsDays);
  chartWeeks = new Highcharts.Chart(optionsWeeks);
  renderYearsTextBox(todayTotals);
}

function parseBikeData(pathToFile, Years){
  let curMonth = 12,
		curYear = -1,
		curMonthRides = 0,
		curWeekRides = 0,
		weekStart = 0


  $.get( pathToFile, function( data ) {  //go through lines
    const lines = data.split('\n');
    let objYear = {}

    $.each(lines, function(lineNo, line) {  //go through comma-separated values in line
      if(line=='') {	//last line - wrap up and return
        if(curMonthRides != 0) {
					objYear.monthly.push(curMonthRides);
        	Years.push(objYear)
				}
				if(curWeekRides != 0)	{
					WeeksSeries.data.push([weekStart,curWeekRides])
        }
				return
      }
			const items = line.split(',')

			const [year,month,day] = items[0].split('-').map(function(ele){return parseInt(ele)})

      if(year != curYear){		//new year!
        if(curYear!=-1){
          Years.push(objYear)
          objYear.monthly.push(curMonthRides);
          curMonthRides = 0;
        }
        objYear = {year:year, monthly:[], daily:[], ridesTotal:0}
        curYear = year
      }

      if(curMonth!=month)	{	//new month!
        if(curMonth<month){
          objYear.monthly.push(curMonthRides);
          curMonthRides = 0;
        }
        curMonth=month;
      }

      const date = items[0],
   			rides = parseInt(items[1]),
				time = Date.parse(date),
				nowtime = now.getTime(),
				dayOfWeek = new Date(time).getDay()

      if(dayOfWeek == 0){	//Monday..Sunday = week

        if(weekStart!=0){
          WeeksSeries.data.push([weekStart,curWeekRides])
          if(typeof(MonthWeekRecords[curMonth])== 'undefined' || MonthWeekRecords[curMonth].rides<WeeksSeries.data[WeeksSeries.data.length-1][1]){

            MonthWeekRecords[curMonth] = {rides:WeeksSeries.data[WeeksSeries.data.length-1][1], time: WeeksSeries.data[WeeksSeries.data.length-1][0]}
          }
        }
        curWeekRides=0;
        weekStart=time;
      }
      curWeekRides+=rides;

      if(typeof MonthDayRecords[curMonth] == 'undefined' || MonthDayRecords[curMonth].rides<rides){
				MonthDayRecords[curMonth] = {time:time, rides:rides};
			}
      if(typeof DayOfWeekRecords[dayOfWeek] == 'undefined' || DayOfWeekRecords[dayOfWeek].rides<rides){
        DayOfWeekRecords[dayOfWeek] = {time:time, rides:rides};
      }

      if(time > nowtime - 90*24*60*60*1000) {	//Days chart for last 90 days

        DaysSeries.data.push([time,rides]);
        if(new Date(time).getDay()==4){	//weekends - yellow stripes
          optionsDays.xAxis.plotBands.push({color: '#FCFFC5', from: time+12*60*60*1000, to: time+2.5*24*60*60*1000});
        }
      }

      if(month==2 && day==29)
        return;		//skip leap day for uniformity

      objYear.ridesTotal+=rides;

      if(objYear.daily.length<365) 				//sometimes we have double-days that skew axis
        objYear.daily.push(objYear.ridesTotal);

      curMonthRides+=rides;

    })

  })
}
