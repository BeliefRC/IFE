/**
 * Created by 10343 on 2017/6/13.
 */
$(document).ready(function () {
    //判断是否为闰年
    function isLeap(year) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return 1;
        }
        else return 0;
    }

    var nowStr = new Date(),//创建时间对象
        yearNow = nowStr.getFullYear(),//获取当前年份
        monNow = nowStr.getMonth(),//获取当前月份
        dayNow = nowStr.getDate(),//获取当日
        m_days = [31, 28 + isLeap(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],//定义每月天数
        weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],//定义星期
        months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        years = new Array(),
        firstDay = new Date(yearNow, monNow, 1).getDay();//获取每月一号星期
    //根据当前年份获取前后10年的年份
    (function () {
        for (var i = (yearNow - 10); i <= (yearNow + 10); i++) {
            years.push(i);

        }
    })(yearNow);

    //将年月插入到下拉框中
    (function () {
        for (var i = 0; i < years.length; i++) {
            var optionYear = document.createElement("option");
            if (years[i] == yearNow) {
                optionYear.selected = "selected";

            }
            optionYear.innerHTML = years[i];
            optionYear.value = years[i];
            $("#selectYear").append(optionYear);


        }
        for (var j = 0; j < months.length; j++) {
            var optionMon = document.createElement("option");
            if (j == monNow + 1) {
                optionMon.selected = "selected";
            }
            optionMon.innerHTML = months[j];
            optionMon.value = j;
            $("#selectMon").append(optionMon);
        }
    })();

    function render(year, mon) {
        m_days = [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        firstDay = new Date(year, mon, 1).getDay();
        for (var i = 0; i < Math.ceil((m_days[mon] + firstDay) / 7); i++) {
            $("#tBody").append("<tr></tr>");
            for (var j = 0; j < 7; j++) {
                var num = i * 7 + j;
                var date_str = num - firstDay + 1; //计算日期
                (date_str <= 0 || date_str > m_days[mon]) ? date_str = "" : date_str = num - firstDay + 1; //过滤无效日期（小于等于零的、大于月总天数的）
                $("#tBody tr:last").append("<td>" + date_str + "</td>");
                //今日日期设为红色
                if (year == yearNow && mon == monNow && date_str == dayNow) {
                    $("#tBody tr td:last").css('background', 'red');
                }
            }
        }
        //渲染表格标题
        $("#time").html($("#selectYear option:selected").val() + "年" + (parseInt($('#selectMon option:selected').val()) + 1) + "月");
        //渲染顶部文本框
        $("#content").val($("#selectYear option:selected").val() + "年" + (parseInt($('#selectMon option:selected').val()) + 1) + "月" + dayNow + "日");

    }

    render(yearNow, monNow);
    function happen() {
        $("tbody tr td").click(function (e) {
            $("#content").val($("#selectYear option:selected").val() + "年" + (parseInt($('#selectMon option:selected').val()) + 1) + "月" + e.target.textContent + "日");
            // render($("#selectYear option:selected").val(), $('#selectMon option:selected').val());
            e.target.style = "background:aqua"
            $("tbody tr td").css('background', 'white')

        })
    }

    happen();
//改变年份或者是月份时，改变表格内容
    $("#selectYear").change(function (e) {
        //清空原有表格内容
        $("tbody").html("");
        render(e.target.value, $('#selectMon option:selected').val());
        happen();


    });

    $("#selectMon").change(function (e) {
        $("tbody").html("");
        render($("#selectYear option:selected").val(), e.target.value);
        happen();
    });


});
