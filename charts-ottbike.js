let chartYears, chartMonths, chartDays, chartWeeks;

const optionsYears = {
	chart: {
				renderTo: 'container_years',
				type: 'line',
				zoomType: 'xy'
			},
	title: {
		text: 'Laurier Bike Lane'
	},
	legend: {
          enabled: false
      },
	xAxis: {
	   //type: 'datetime',
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
          //crosshairs: true,
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
		zoomType: 'xy'

	},
	title: {
		text: null
	},
	subtitle: {
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
		renderTo: 'container_days',
		zoomType: 'xy'

	},
	legend: {
          enabled: false
      },
	title: {
		text: null
	},
	subtitle: {
		text: null
	},
	xAxis: {
		type: 'datetime',
		//tickInterval: 7 * 24 * 3600 * 1000,
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
		renderTo: 'container_weeks',
		zoomType: 'xy'

	},
	legend: {
          enabled: false
      },
	title: {
		text: null
	},
	subtitle: {
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

const DaysSeries = {
            name: 'Day total',
            data: []
        };

const WeeksSeries = {
            name: 'Week total',
            data: []
        };
const thisWeeksSeries = {
            name: 'This week total',
            color: '#ffa126',
            data: []
        };

const MonthDayRecords = []
const DayOfWeekRecords = []
const RidesInYear = {2012:0,2013:0,2014:0,2015:0,2016:0,2017:0,2018:0};
const YearsSeries = {2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]},2018:{data:[]}};
const MonthsSeries = {2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]},2018:{data:[]}};


const Years = []
var todayTotals = [];

function getSortedPointsKeys(points) {
    var keys = []; for(var key in points) keys.push(key);
    return keys.sort(function(a,b){return points[b].y-points[a].y});
}

function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}


function TooltipFormatter(tooltip) {

	var sortedPoints = getSortedPointsKeys(tooltip.points);

    // Create the header with reference to the time interval
    var index = tooltip.points[0].point.index,
        ret = '<small>' + GetDayMonthFromDayNum(tooltip.x) + '</small><br>';


    ret += '<table>';

	for(var key in sortedPoints)
	{
        var series = tooltip.points[sortedPoints[key]].series;
		var yearShow = tooltip.points[sortedPoints[key]].y;		//whichever year we are showing
		var yearCur = tooltip.points[tooltip.points.length-1].y;		//2017
		var diff = '<span style="font-size: 75%;">' + (yearCur>yearShow?' (':' (+');
		diff+=Highcharts.numberFormat(yearShow-yearCur,0)+') </span>';
		if(yearShow==yearCur) diff='';

		ret += '<tr><td><span style="color:' + series.color + ';">\u25CF</span> ' + series.name +
			': </td><td style="margin:0;white-space:nowrap"><b>' + Highcharts.numberFormat(yearShow,0) +
			'</b></td><td>'+ diff +'</td></tr>';

    }

    // Close
    ret += '</table>';


    return ret;
};


function GetDayMonthFromDayNum(daynum)
{
	var date = new Date(2018, 0); // initialize a date in `year-01-01`
	var date1 = new Date(date.setDate(daynum+1)); // add the number of days

	return Highcharts.dateFormat('%b %e', date1.getTime())

	/*return date1.toLocaleDateString('en-GB', {
		day : 'numeric',
		month : 'short',
		year : 'numeric'
	}).split(' ');*/
};

function GetMonthFromDayNum(daynum)
{
	var date = new Date(2018, 0); // initialize a date in `year-01-01`
	var date1 = new Date(date.setDate(daynum+1)); // add the number of days

	return Highcharts.dateFormat('%b', date1.getTime())

	/*return date1.toLocaleDateString('en-GB', {
		day : 'numeric',
		month : 'short',
		year : 'numeric'
	}).split(' ');*/
};


function renderYearsTextBox(todayTotals)
{
	const curYear = todayTotals.length-1
	var sortedYears = getSortedKeys(todayTotals);

	var labelText = 'To this day:<br>';

	for(var key in sortedYears)
	{
		var year = sortedYears[key];
		var series = chartYears.get(parseInt(year));//YearsSeries[sortedYears[key]];
		var diff = '<span style="font-size: 75%;">' + (todayTotals[curYear]>todayTotals[sortedYears[key]]?' (':' (+');
		diff+=Highcharts.numberFormat(todayTotals[sortedYears[key]]-todayTotals[curYear],0)+') </span>';
		if(curYear==sortedYears[key]) diff='';

		labelText+= '<span style="color:' + series.color + ';">\u25CF</span> ' + sortedYears[key] +
			': <span style="display: inline-block;width: 240px;"><b>' + Highcharts.numberFormat(todayTotals[sortedYears[key]],0)+' </b></span>'+diff+'<br>';

	}

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

	var monthOfYear = new Date(lastDayTime+24*60*60*1000).getMonth()+1;	//check one day into future because timezones
	var dayOfWeek = new Date(lastDayTime).getDay();
	const MonthRecord = MonthDayRecords[monthOfYear];
	const DayOfWeekRecord = DayOfWeekRecords[dayOfWeek];
	//var monthWeekRecordValue = MonthWeekRecords[monthOfYear][0];
	//this month record line
	optionsDays.yAxis.plotLines.push(
											{
												value: MonthRecord.rides,
												color: 'grey',
												width: 1,
												dashStyle: 'Dot',
												label: {
													useHTML: true,
													text: Highcharts.dateFormat("%B",lastDayTime)+' all-time high: <b>'+ MonthRecord.rides + '</b> on ' + Highcharts.dateFormat("%Y-%m-%d",MonthRecord.time),
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
													text: Highcharts.dateFormat("%A",lastDayTime)+' all-time high: <b>'+ DayOfWeekRecord.rides + '</b> on ' + Highcharts.dateFormat("%Y-%m-%d",DayOfWeekRecord.time),
													style: {
														color: 'grey',
														fontSize: '11px'
													},
													x:0,
													y: (MonthRecord.rides>DayOfWeekRecord.rides && MonthRecord.rides-DayOfWeekRecord.rides<500)?12:-5
												}
											});
/*
											//this month week record line
	optionsWeeksChart.yAxis.plotLines.push(
											{
												value: monthWeekRecordValue,
												color: 'grey',
												width: 1,
												dashStyle: 'Dot',
												label: {
													useHTML: true,
													text: Highcharts.dateFormat("Busiest <b>%B",lastDayTime)+'</b> week ever: <b>'+ monthWeekRecordValue + '</b> on ' + Highcharts.dateFormat("%Y-%m-%d",MonthWeekRecords[monthOfYear][1]),
													style: {
														color: 'grey',
														fontSize: '11px'
													},
													x:0,
													y: 12
												}
											});
          */
};

const now = new Date();

$(document).ready(function(){

  jQuery.ajaxSetup({async:false});
  parseBikeData('laurier.csv', Years)
  const todayPoint = Years[Years.length-1].daily.length-1;

  for(let year of Years){
      optionsYears.series.push({id:year.year, name:year.year, data: year.daily});
      optionsMonths.series.push({id:year.year, name:year.year, data: year.monthly});
      todayTotals[year.year] = year.daily[todayPoint];
  }
  optionsDays.series.push(DaysSeries);
  optionsWeeks.series.push(WeeksSeries);


  AddRecordsLines();

  chartYears = new Highcharts.Chart(optionsYears);
  chartMonths = new Highcharts.Chart(optionsMonths);
  chartDays = new Highcharts.Chart(optionsDays);
  chartWeeks = new Highcharts.Chart(optionsWeeks);
  renderYearsTextBox(todayTotals);
})


function parseBikeData(pathToFile, Years){
  let curMonth = -1;
	let	curYear = -1;
	let	curMonthRides = 0;
	let	curWeekRides = 0;
  let weekStart = 0;


  $.get( pathToFile, function( data ) {  //go through lines
    const lines = data.split('\n');
    let objYear = {}

    $.each(lines, function(lineNo, line) {  //go through comma-separated values in line
      var items = line.split(',');
      if(line=='') {
        objYear.monthly.push(curMonthRides);
        Years.push(objYear)

        return
      }
      const values = line.split(',');

      const array = values[0].split('-')
      const year = parseInt(array[0])
      const month = parseInt(array[1])
      const day = parseInt(array[2])

      if(year != curYear){
        if(curYear!=-1){
          Years.push(objYear)
          objYear.monthly.push(curMonthRides);
          curMonthRides = 0;
        }
        objYear = {year:year, monthly:[], daily:[], ridesTotal:0}
        curYear = year
      }

      if(curMonth!=month)
      {
        if(curMonth!=-1){
          objYear.monthly.push(curMonthRides);
          curMonthRides = 0;
        }
        curMonth=month;
      }

      var date = items[0];
      var rides = parseFloat(items[1]);

      var time = Date.parse(date);
      var nowtime = now.getTime();
      var dayOfWeek = new Date(time).getDay();

      if(dayOfWeek == 0)	//Monday..Sunday = week
      {
        if(weekStart!=0)
          WeeksSeries.data.push([weekStart,curWeekRides])

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

      if(time > nowtime - 90*24*60*60*1000)	//last 90 days
      {
        var d = new Date(time);
        DaysSeries.data.push([time,rides]);
        if(d.getDay()==4){
          optionsDays.xAxis.plotBands.push({color: '#FCFFC5', from: time+12*60*60*1000, to: time+2.5*24*60*60*1000});
        }

      }

      if(month==2 && day==29)
        return true;		//continue

      objYear.ridesTotal+=rides;

      if(objYear.daily.length<365) 				//sometimes we have double-days that skew axis
        objYear.daily.push(objYear.ridesTotal);



      curMonthRides+=rides;

    })

  })
}
