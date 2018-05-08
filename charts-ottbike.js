//weather history for Experimental Farm: http://climate.weather.gc.ca/climate_data/daily_data_e.html?hlyRange=%7C&dlyRange=1889-11-01%7C2017-06-20&mlyRange=1889-01-01%7C2006-12-01&StationID=4333&Prov=ON&urlExtension=_e.html&searchType=stnName&optLimit=yearRange&StartYear=2012&EndYear=2017&selRowPerPage=25&Line=0&searchMethod=contains&txtStationName=ottawa&timeframe=2&Day=27&Year=2016&Month=6#

var chartYears, chartMonths, chartDays, chartWeeks;
var todayLaurierTotals = [];
var todayPortageTotals = [];

var now = new Date();

var optionsLaurierYears = {
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
	};	//end var options
	var optionsLaurierMonths = {

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


	var optionsLaurierDays = {

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

	var optionsLaurierWeeks = {

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

	var optionsPortageYears = {
		chart: {
					renderTo: 'container_years',
					zoomType: 'xy'

				},
		title: {
			text: 'Portage Bike Lane'

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
			max:400000,
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
	};	//end var options

	var optionsPortageMonths = {

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


	var optionsPortageDays = {

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

	var optionsPortageWeeks = {

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
			min: 0,
			title: {
				text: null
			},
			crosshair: true,
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

GetDayMonthFromDayNum = function (daynum)
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

GetMonthFromDayNum = function (daynum)
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

getSortedPointsKeys = function(points) {
    var keys = []; for(var key in points) keys.push(key);
    return keys.sort(function(a,b){return points[b].y-points[a].y});
}

getSortedKeys = function(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

renderYearsTextBox = function (todayTotals)
{
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

AddRecordsLines = function (optionsDaysChart, lastDayTime, MonthRecords, DayRecords)
{
	var monthOfYear = new Date(lastDayTime+24*60*60*1000).getMonth()+1;	//check one day into future because timezones
	var dayOfWeek = new Date(lastDayTime).getDay();
	var monthRecordValue = MonthRecords[monthOfYear][0];
	var dayRecordValue = DayRecords[dayOfWeek][0];

	//this month record line
	optionsDaysChart.yAxis.plotLines.push(
											{
												value: monthRecordValue,
												color: 'grey',
												width: 1,
												dashStyle: 'Dot',
												label: {
													useHTML: true,
													text: Highcharts.dateFormat("%B",lastDayTime)+' all-time high: <b>'+ monthRecordValue + '</b> on ' + Highcharts.dateFormat("%Y-%m-%d",MonthRecords[monthOfYear][1]),
													style: {
														color: 'grey',
														fontSize: '11px'
													},
													x:0,
													y: monthRecordValue>dayRecordValue?-5:12
												}
											});
	//this day of week record line
	optionsDaysChart.yAxis.plotLines.push(
											{
												value: dayRecordValue,
												color: 'grey',
												width: 1,
												dashStyle: 'Dot',
												label: {
													useHTML: true,
													text: Highcharts.dateFormat("%A",lastDayTime)+' all-time high: <b>'+ dayRecordValue + '</b> on ' + Highcharts.dateFormat("%Y-%m-%d",DayRecords[dayOfWeek][1]),
													style: {
														color: 'grey',
														fontSize: '11px'
													},
													x:0,
													y: (monthRecordValue>dayRecordValue && monthRecordValue-dayRecordValue<500)?12:-5
												}
											});

	optionsDaysChart.yAxis.minRange = monthRecordValue;
};

TooltipFormatter = function (tooltip) {

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


parseBikeData = function(lines, RidesInYear, YearsSeries, MonthsSeries, DaysSeries, WeeksSeries, DayRecords, MonthRecords)
{
	var curMonth = -1;
		curYear = -1;
		curMonthRides = 0;
		curWeekRides = 0;

		var weekStart = 0;

		$.each(lines, function(lineNo, line) {
			var items = line.split(',');

			if(line !="")
			{
				var date = items[0];
				var array = date.split('-'),
					year = parseInt(array[0]), month = parseInt(array[1]), day = parseInt(array[2]);

				if(curYear==-1)	curYear = year;
				if(curMonth==-1) curMonth = month;

				if(curMonth!=month)
				{
					MonthsSeries[curYear].data.push(curMonthRides);
					curMonthRides = 0;
					curMonth=month;
				}
				if(curYear!=year)
				{
					MonthsSeries[curYear].name = curYear;
					YearsSeries[curYear].name = curYear;
					YearsSeries[curYear].id = curYear;
					curYear=year;
				}

				var rides = parseFloat(items[1]);

				var time = Date.parse(date);
				var nowtime = now.getTime();
				var dayOfWeek = new Date(time).getDay();

				if(DayRecords[dayOfWeek][0]<rides)
				{
					DayRecords[dayOfWeek][0] = rides;
					DayRecords[dayOfWeek][1] = time;
				}

				if(MonthRecords[curMonth][0]<rides)
				{
					MonthRecords[curMonth][0] = rides;
					MonthRecords[curMonth][1] = time;
				}

				if(dayOfWeek == 0)	//Monday..Sunday = week
				{
					if(weekStart==0)
						weekStart = time;
					else
						WeeksSeries.data.push([weekStart,curWeekRides])

					curWeekRides=0;
					weekStart=time;
				}
				curWeekRides+=rides;

				if(time > nowtime - 90*24*60*60*1000)	//last 90 days
				{
					var d = new Date(time);
					DaysSeries.data.push([time,rides]);
					if(d.getDay()==4)
					{
						optionsLaurierDays.xAxis.plotBands.push({color: '#FCFFC5', from: time+12*60*60*1000, to: time+2.5*24*60*60*1000});
						optionsPortageDays.xAxis.plotBands.push({color: '#FCFFC5', from: time+12*60*60*1000, to: time+2.5*24*60*60*1000});
					}
				}

				if(month==2 && day==29)
					return true;		//continue

				RidesInYear[year]+=rides;

				if(YearsSeries[year].data.length<365) 				//sometimes we have double-days that skew axis
					YearsSeries[year].data.push(RidesInYear[year]);



				curMonthRides+=rides;
			}
		});	//end each(lines

		if(curWeekRides != 0)	WeeksSeries.data.push([weekStart,curWeekRides])

		MonthsSeries[curYear].name = curYear;
		YearsSeries[curYear].name = curYear;
		YearsSeries[curYear].id = curYear;

		MonthsSeries[curYear].data.push(curMonthRides);		//push last month


}

$(document).ready(function()
{

	$.get( 'laurier.csv', function( data ) {
        var DaysSeries = {
                    name: 'Day total',
                    data: []
                };

        var WeeksSeries = {
                    name: 'Week total',
                    data: []
                };
        var thisWeeksSeries = {
                    name: 'This week total',
                    color: '#ffa126',
                    data: []
                };

        var RidesInYear = {2012:0,2013:0,2014:0,2015:0,2016:0,2017:0,2018:0};
        var YearsSeries = {2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]},2018:{data:[]}};
        var MonthsSeries = {2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]},2018:{data:[]}};
        var DayRecords = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
        var MonthRecords = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];

         // Split the lines
        var lines = data.split('\n');

        parseBikeData(lines, RidesInYear, YearsSeries, MonthsSeries, DaysSeries, WeeksSeries, DayRecords, MonthRecords);

        var todayPoint = YearsSeries[now.getFullYear()].data.length-1;


        for (i = 2012; i<=now.getFullYear(); i++)
        {
            optionsLaurierYears.series.push(YearsSeries[i]);
            optionsLaurierMonths.series.push(MonthsSeries[i]);
            todayLaurierTotals[i] = YearsSeries[i].data[todayPoint];
        }

        thisWeeksSeries.data.push(WeeksSeries.data[WeeksSeries.data.length-1]);
        WeeksSeries.data.length = WeeksSeries.data.length-1;

        optionsLaurierDays.series.push(DaysSeries);
        optionsLaurierWeeks.series.push(WeeksSeries);
        optionsLaurierWeeks.series.push(thisWeeksSeries);


        var lastDayTime = DaysSeries.data[DaysSeries.data.length-1][0];

        AddRecordsLines(optionsLaurierDays, lastDayTime, MonthRecords, DayRecords);


        chartYears = new Highcharts.Chart(optionsLaurierYears);
        chartMonths = new Highcharts.Chart(optionsLaurierMonths);
        chartDays = new Highcharts.Chart(optionsLaurierDays);
        chartWeeks = new Highcharts.Chart(optionsLaurierWeeks);

        renderYearsTextBox(todayLaurierTotals);
      });


	$.get( 'portage.csv', function( data ) {

            var lines = data.split('\n');

            var DaysSeries = {
                        name: 'Day total',
                        data: []
                    };

            var WeeksSeries = {
                        name: 'Week total',
                        data: []
                    };
            var thisWeeksSeries = {
                        name: 'This week total',
                        color: '#ffa126',
                        data: []
                    };
            var RidesInYear = {2014:0,2015:0,2016:0,2017:0,2018:0};
            var YearsSeries = {2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]},2018:{data:[]}};
            var MonthsSeries = {2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]},2018:{data:[]}};
            var DayRecords = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
            var MonthRecords = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];


            parseBikeData(lines, RidesInYear, YearsSeries, MonthsSeries, DaysSeries, WeeksSeries, DayRecords, MonthRecords);

            var todayPoint = YearsSeries[now.getFullYear()].data.length-1;


            for (i = 2014; i<=now.getFullYear(); i++)
            {
                optionsPortageYears.series.push(YearsSeries[i]);
                optionsPortageMonths.series.push(MonthsSeries[i]);
                todayPortageTotals[i] = YearsSeries[i].data[todayPoint];
            }

            thisWeeksSeries.data.push(WeeksSeries.data[WeeksSeries.data.length-1]);
            WeeksSeries.data.length = WeeksSeries.data.length-1;

            optionsPortageDays.series.push(DaysSeries);
            optionsPortageWeeks.series.push(WeeksSeries);
            optionsPortageWeeks.series.push(thisWeeksSeries);

            var lastDayTime = DaysSeries.data[DaysSeries.data.length-1][0];

            AddRecordsLines(optionsPortageDays, lastDayTime, MonthRecords, DayRecords);

	}); //end get portage csv



	$('#laurier').click(function ()
	{
		chartDays.destroy();
		chartMonths.destroy();
		chartYears.destroy();
		chartWeeks.destroy();
		chartDays = new Highcharts.Chart(optionsLaurierDays);
		chartMonths = new Highcharts.Chart(optionsLaurierMonths);
		chartYears = new Highcharts.Chart(optionsLaurierYears);
		chartWeeks = new Highcharts.Chart(optionsLaurierWeeks);
		renderYearsTextBox(todayLaurierTotals);
	});

	$('#portage').click(function ()
	{
		chartDays.destroy();
		chartMonths.destroy();
		chartYears.destroy();
		chartWeeks.destroy();
		chartDays = new Highcharts.Chart(optionsPortageDays);
		chartMonths = new Highcharts.Chart(optionsPortageMonths);
		chartYears = new Highcharts.Chart(optionsPortageYears);
		chartWeeks = new Highcharts.Chart(optionsPortageWeeks);

		renderYearsTextBox(todayPortageTotals);
	});



});	//end main func
