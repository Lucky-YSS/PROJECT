#获取两个日期之间相关时间参数组件

返回两个时间相隔天数
getBetween(startDate, endDate,type)
#startDate 开始时间
#endDate 结束时间
#type month （返回相隔月份）month-day (返回相隔的月份和天数) all (返回相隔年月日) 默认值 month-day

#返回两个日期之间相关的月份
getBetweenM(start, end, type)
#start 开始的月份/日期
#end 结束的月份/日期
#type month (传入的是月份) date (传入的是日期) 默认值 month

例:
import fyDate from 'fy-date';
const FYDATE = fyDate.FYDATE;
FYDATE.getBetween('2023/2/12','2023/3/12') // 输出 {month: 1, day: 0}
FYDATE.getBetweenM('2023/2/12','2023/5/12', 'date') // 输出 [3,4]

持续开发中....
使用有问题请先发邮件到felixyhp@163.com