var chartYears, chartMonths;

var Years = [	
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}}
					];
var Months = [	
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}},
						{2010:{data:[]},2011:{data:[]},2012:{data:[]},2013:{data:[]},2014:{data:[]},2015:{data:[]},2016:{data:[]},2017:{data:[]}}
					];
						
var Weeks = [	
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]},
						{data:[]}
					];
var optionsYears = {
		chart: {
					renderTo: 'container_years',
					type: 'line'
				},
		title: {
			text: 'Counter #1'
		},
		subtitle: {
			text: null
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
			//max:500000,
			
		},
		tooltip: {
            //crosshairs: true,
            split: true,
            valueSuffix: ' rides',
			useHTML: true,
			headerFormat: '<span style="font-size:10px">Day {point.x}</span>',
		/*	formatter: function () {
                return TooltipFormatter(this, false);
            }
		*/
        },
		
		series: []
	};	//end var options
	var optionsMonths = {
	
		chart: {
			type: 'column',
			renderTo: 'container_months',
					
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
	var optionsWeeks = {
	
		chart: {
			type: 'column',
			renderTo: 'container_weeks',
					
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
	
ShowCounter = function(num)
{
	if (typeof chartMonths !== 'undefined') 
	{
		chartMonths.destroy();
		chartYears.destroy();
		chartWeeks.destroy();
		optionsMonths.series.length=0;
		optionsYears.series.length=0;
		optionsWeeks.series.length=0;
	}
	
	for (i = 2010; i<2018; i++) 
	{
		if(Months[num][i].data.length==0) continue;
		optionsYears.series.push(Years[num][i]);	
		optionsMonths.series.push(Months[num][i]);	
	}
	optionsWeeks.series.push(Weeks[num]);
	optionsWeeks.series[0].name="Week Total";
	
	optionsYears.title.text = Years[num].name;
	optionsYears.subtitle.text = Years[num].description;
	chartMonths = new Highcharts.Chart(optionsMonths);
	chartYears = new Highcharts.Chart(optionsYears);
	chartWeeks = new Highcharts.Chart(optionsWeeks);
	
	
}
	
GetDayMonthFromDayNum = function (daynum) 
{
	var date = new Date(2017, 0); // initialize a date in `year-01-01`
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
	var date = new Date(2017, 0); // initialize a date in `year-01-01`
	var date1 = new Date(date.setDate(daynum+1)); // add the number of days
    
	return Highcharts.dateFormat('%b', date1.getTime())
	
	/*return date1.toLocaleDateString('en-GB', {
		day : 'numeric',
		month : 'short',
		year : 'numeric'
	}).split(' ');*/
};


TooltipFormatter = function (tooltip) {

    // Create the header with reference to the time interval
    var index = tooltip.points[0].point.index,
        ret = '<small>' + GetDayMonthFromDayNum(tooltip.x) + '</small><br>';

    
    ret += '<table>';

    // Add all series
    Highcharts.each(tooltip.points, function (point) {
        var series = point.series;
			
		ret += '<tr><td><span style="margin:0;color:' + series.color + '">Year </span> ' + series.name +
			': </td><td style="margin:0;white-space:nowrap"><b>' + point.y +
			series.options.tooltip.valueSuffix + '</b></td></tr>';
		
    });

    // Close
    ret += '</table>';


    return ret;
};


$(document).ready(function()  
{
	
	$.get('OttcityCounters.csv', function(data) {
				
				
				
		var RidesInYear = [	
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0},
							{2010:0,2011:0,2012:0,2013:0,2014:0,2015:0,2016:0,2017:0}
						];
		
		 // Split the lines
		var lines = data.split('\n');
		
		var curMonth = -1;
			curYear = -1;
		
		var	curMonthRides = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		var	curWeekRides = [0,0,0,0,0,0,0,0,0,0,0,0,0];	
			
		var nTotalCounters = 13;
			weekStart = 0;
			
		var now = new Date();
		
		$.each(lines, function(lineNo, line) {
			var items = line.split(',');	
					
			if(lineNo==0)
			{
				for(i=0; i<nTotalCounters; i++)
				{
					Years[i].name = items[i+1];
				}
			}
			if(lineNo==1)
			{
				for(i=0; i<nTotalCounters; i++)
				{
					Years[i].description = items[i+1];
				}
			}			
			if(line !="" && lineNo>1)
			{
				var date = items[0];
				var array = date.split('-'),
					year = array[0], month = array[1], day = array[2];
				
				if(curYear==-1)	curYear = year;
				if(curMonth==-1) curMonth = month;
				
				if(new Date(date).getDay() == 0)	//Monday..Sunday = week
				{
					for(i=0; i<nTotalCounters; i++)
					{
						if(weekStart!=0 && !isNaN(curWeekRides[i]))
							Weeks[i].data.push([weekStart,curWeekRides[i]])
						
						curWeekRides[i]=0;
						
					}
					weekStart=Date.parse(date);
				}
				
				
				if(month==2 && day==29)
					return true;		//skip leap days
				
				
				for(i=0; i<nTotalCounters; i++)
				{
					RidesInYear[i][year]+=parseFloat(items[i+1]);
					curWeekRides[i]+=parseFloat(items[i+1]);
					if(Years[i][year].data.length<365) 				//sometimes we have double-days that skew axis
						Years[i][year].data.push(RidesInYear[i][year]);
				}
				if(curMonth!=month)
				{
					for(i=0; i<nTotalCounters; i++)
					{
						Months[i][curYear].data.push(curMonthRides[i]);
						curMonthRides[i] = 0;
					}
					curMonth=month;
				}
				if(curYear!=year)
				{
					for(i=0; i<nTotalCounters; i++)
					{
						//if(RidesInYear[i][curYear]>0)
						{
							Months[i][curYear].name = curYear;
							Years[i][curYear].name = curYear;
							Years[i][curYear].id = curYear;
						}
					}
					curYear=year;
				}
				
				for(i=0; i<nTotalCounters; i++)
				{
					curMonthRides[i]+=parseFloat(items[i+1]);
				}
			}
		});	//end each(lines
 		
		
		for(i=0; i<nTotalCounters; i++)
		{
			Months[i][curYear].name = curYear;
			Years[i][curYear].name = curYear;
			Years[i][curYear].id = curYear;
		}	
		
		ShowCounter(0);
					/*
		for (i = 2010; i<2018; i++) 
		{
			if(Months[0][i].data.length==0) continue;
			optionsYears.series.push(Years[0][i]);	
			optionsMonths.series.push(Months[0][i]);	
		}
		
		chartYears = new Highcharts.Chart(optionsYears);
		chartMonths = new Highcharts.Chart(optionsMonths);
		*/
		
	});	//end get csv

		
	$('#1').click(function () 
	{
		ShowCounter(0);
	});
	
	$('#2').click(function () 
	{
		ShowCounter(1);
	});

	$('#3').click(function () 
	{
		ShowCounter(2);
	});
	
	$('#4').click(function () 
	{
		ShowCounter(3);
	});
	$('#5').click(function () 
	{
		ShowCounter(4);
	});
	$('#6').click(function () 
	{
		ShowCounter(5);
	});
	$('#7').click(function () 
	{
		ShowCounter(6);
	});
	$('#8').click(function () 
	{
		ShowCounter(7);
	});
	$('#9').click(function () 
	{
		ShowCounter(8);
	});
	$('#10').click(function () 
	{
		ShowCounter(9);
	});
	$('#11').click(function () 
	{
		ShowCounter(10);
	});
	$('#12').click(function () 
	{
		ShowCounter(11);
	});
	$('#13').click(function () 
	{
		ShowCounter(12);
	});
	$('#14').click(function () 
	{
		ShowCounter(13);
	});
	
	

});	//end main func

