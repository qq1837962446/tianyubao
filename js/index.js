
    $.ajax({
        url:"http://api.jisuapi.com/weather/query?appkey=f1c1640838697b20&city=太原",
        dataType:"jsonp",
        success:function (r) {
            console.log(r);
            var data=r.result.daily;
            // console.log(data);
            var temphight="";
            var city = r.result.city;
            var str="";
            var week="";
            var date="";
            var img="";
            var temp="";
            var windpower="";
            $.each(data,function (index,val) {
                temphight=`<td>${val.day.temphigh}°</td><td class="weather-tianqi">${val.day.weather}</td>`;
                str=`<td class="weather">${val.night.templow}/${val.day.temphigh}℃</td>`;
                week+=`<td>${val.week}</td>`;
                date+=`<td>${val.sunset}</td>`;
                img+=`<td><img src="weathercn02/${val.day.img}.png" alt=""></td>`;
                temp+=`<td>${val.night.templow}/${val.day.temphigh}℃</td>`;
                windpower+=`<td>${val.day.windpower}</td>`
            });
            $(".dushu").html(temphight);
            $(".weather").html(str);
            $(".day").html(week);
            $(".date").html(date);
            $(".img").html(img);
            $(".temphigh").html(temp);
            $(".windpower").html(windpower);
            $("#citys").html(city);
        }
    });
    var dates=new Date();
    var t=dates.toLocaleDateString();  //时间转化的格式化
    $(".riqi").html(t);


//选择城市  省区
$(".add").click(function () {
    $(".mask").show(500);
    $.ajax({
        url:"http://api.jisuapi.com/weather/city?appkey=f1c1640838697b20",
        dataType:"jsonp",
        success:function (r) {
            var data=r.result;
            var provincedata=$.grep(data,function (val,index) {
                return;
            });
            console.log(r);
            var str="<option value=0>--请选择省份--</option>";
            $.each(data,function (index,val) {
                str+=`<option value="${val.cityid}">${val.city}</option>`
            });
            $("#province").html(str);
        }
    });
    //市区
    $("#province").change(function () {
        var value=$(this).val();
        if(value==0)return;
        $.ajax({
            url:"http://api.jisuapi.com/weather/city?appkey=f1c1640838697b20",
            dataType:"jsonp",
            success:function (r) {
                var data=r.result;
                var citydata=$.grep(data,function(val,index) {
                    return val.parentid==value;
                });
                var str="<option value=0>--请选择城市--</option>"
                $.each(citydata,function (index,val) {
                    str+=`<option value="${val.cityid}">${val.city}</option>`;
                });
                $("#city").html(str);
            }
        })
    });
    //县区
    $("#city").change(function () {
        var value=$(this).val();
        if(value===0)return;
        $.ajax({
            url:"http://api.jisuapi.com/weather/city?appkey=f1c1640838697b20",
            dataType:"jsonp",
            success:function (r) {
                var data=r.result;
                var towndata=$.grep(data,function (val,index) {
                    return val.parentid==value;
                });
                var str="<option value=0>--请选择区县--</option>";
                $.each(towndata,function (index,val) {
                    str+=`<option>${val.city}</option>`;
                })
                $("#town").html(str);
            }
        })
    })
});
$(".addto").click(function () {
    $(".mask").css("display","none");
    var citylist = $("#town").val();
    $.ajax({
        url:`http://api.jisuapi.com/weather/query?appkey=f1c1640838697b20&city=${citylist}`,
        dataType:"jsonp",
        success:function (r) {
            console.log(r);
            var data=r.result.daily;
            // console.log(data);
            var temphight="";
            var city = r.result.city;
            var str="";
            var week="";
            var date="";
            var img="";
            var temp="";
            var windpower="";
            $.each(data,function (index,val) {
                temphight=`<td>${val.day.temphigh}°</td><td class="weather-tianqi">${val.day.weather}</td>`;
                str=`<td class="weather">${val.night.templow}/${val.day.temphigh}℃</td>`;
                week+=`<td>${val.week}</td>`;
                date+=`<td>${val.sunset}</td>`;
                img+=`<td><img src="weathercn02/${val.day.img}.png" alt=""></td>`;
                temp+=`<td>${val.night.templow}/${val.day.temphigh}℃</td>`;
                windpower+=`<td>${val.day.windpower}</td>`
            });
            $(".dushu").html(temphight);
            $(".weather").html(str);
            $(".day").html(week);
            $(".date").html(date);
            $(".img").html(img);
            $(".temphigh").html(temp);
            $(".windpower").html(windpower);
            $("#citys").html(city);
        }
    });
});