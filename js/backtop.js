$(document).ready(function(){$("#back-top").hide(),$(function(){$(window).scroll(function(){$(this).scrollTop()>100?$("#back-top").fadeIn():$("#back-top").fadeOut()}),$("#back-top a, #pagewraptop").click(function(){return $("body,html").animate({scrollTop:0},1200),!1})})});