$(function(){

	$.getJSON( "data/fleporcq.json", function(data) {
		
		 $.get('templates/default.html', function(template) {
		 
			data.nl2br = function () {
				return function (text, render) {
					return render(text).replace(/(\r\n|\n|\r)/gm, '<br>');
				}
			}
			
			data.phone2string = function () {
				return function (text, render) {
					return render(text).replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
				}
			}
			
			data.identity.age = function(){
				var birthdate = data.identity.birthdate.match(/(\d{4})-(\d{2})-(\d{2})/);
				return new Date(Date.now() - new Date(
					parseInt(birthdate[1]), 
					parseInt(birthdate[2]) - 1, 
					parseInt(birthdate[3])
				).getTime()).getUTCFullYear() - 1970;
			}

			$("#content").html(Mustache.render(template, data));
			
			$("section#experiences > ul > li > ul > li:odd").addClass("odd").find('.experience').attr("data-animation", "fadeInRight");
			$("section#experiences > ul > li > ul > li:even").addClass("even").find('.experience').attr("data-animation", "fadeInLeft");
			
			$('[data-animation]').waypoint(function(){
				$(this).toggleClass('active animated ' + $(this).attr("data-animation"));
			},{
				offset:'90%'
			});
			
			$('#topskills li').easyPieChart({
				barColor: '#A8BF12',
				trackColor: '#2F4254',
				scaleColor: false,
				lineCap: 'butt',
				lineWidth: 12,
				size:110,
				animate: 2000
			});
			
			

		});
	});


});