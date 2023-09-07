// 封装日期时间计算方法

export class DATE {
  static #FIXED_MONTH_DAY = {1:31, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};
  static #FLOAT_MONTH_DAY = {2:28};
  static #FINAL_MONTH_DAY = {};
  YEAR = new Date().getFullYear();
  static #GET_FLOAT_MONTH(year, back = false) {
    let data = {};
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
      back ? (data[2] = 29) : DATE.#FLOAT_MONTH_DAY[2] = 29
    } else {
      back ? data[2] = 28 : DATE.#FLOAT_MONTH_DAY[2] = 28
    }
    if(back) {
      return data;
    }
  }
  constructor(year) {
    year ? this.YEAR = year : ''
    DATE.#INIT_MONTH(this.YEAR);
  }
  static #INIT_MONTH(year, status = false) {
    let float_month = DATE.#GET_FLOAT_MONTH(year, status);
    if (status) {
      return Object.assign(DATE.#FIXED_MONTH_DAY,float_month);
    } else {
      DATE.#FINAL_MONTH_DAY = Object.assign(DATE.#FIXED_MONTH_DAY, DATE.#FLOAT_MONTH_DAY);
    }
  }
  static getBetween(d_1,d_2,type = 'month-day') {
    let ds = new Date(d_1);
    let de = new Date(d_2);
    let s_year = ds.getFullYear();
    let s_month_list = DATE.#INIT_MONTH(s_year, true);
    let e_year = de.getFullYear();
    let e_month_list = DATE.#INIT_MONTH(e_year, true);
    let s_month = ds.getMonth();
    let e_month = de.getMonth();
    let s_day = ds.getDate();
    let e_day = de.getDate();
    let y = e_year - s_year;
    let m;
    s_month > e_month ? (y -1, m = e_month + 12 - s_month) : (m = e_month - s_month);
    let s_m_d =  s_month_list[s_month + 1];
    let e_m_d =  e_month_list[e_month + 1];
    let is_s_end = s_m_d === s_day;
    let is_e_end = e_m_d === e_day;
    let d;
    if (is_s_end && is_e_end) {
      d = 0;
    } else if (is_s_end && !is_e_end) {
      m -=1;
      d = e_month_list[e_month] > s_day ? e_day + e_month_list[e_month] - s_day : e_day;
    } else if (!is_s_end && is_e_end) {
      d = s_m_d - s_day;
    } else {
      if(s_day > e_day) {
        m -= 1;
        d = e_month_list[e_month] - s_day + e_day;
      } else {
        d = e_day - s_day;
      }
    }
    if (type == 'month') {
      let r_m = y > 0 ? y*12 + m : m;
      return r_m;
    } else if (type == 'month-day') {
      let r_m = y > 0 ? y*12 + m : m;
      return {month: r_m, day: d};
    } else if (type == 'all') {
      // return y + '-' + m + '-' + d;
      return {year: y,month: m,day: d};
    }
  }
  static getBetweenM(m_1, m_2, type = 'mouth') {
    let r_m = []
    if (type == 'date') {
      let d_1 = new Date(m_1);
      let d_2 = new Date(m_2);
      m_1 = d_1.getMonth() + 1;
      m_2 = d_2.getMonth() + 1;
    }

    if (m_1 < m_2) {
      for(let i = m_1;i < m_2;i++) {
        if (i + 1 < m_2) {
          let m =  i + 1;
          r_m.push(m);
        }
      }
    } else if (m_1 == m_2) {
      for(let i = 1; i <= 12;i++) {
        if(i != m_1) {
          r_m.push(i);
        }
      }
    } else {
      let b_m = 12;
      for(let i = m_1;i < b_m;i++) {
        if (i + 1 <= b_m) {
          let m =  i + 1;
          r_m.push(m);
        }
        if (i == 11) {
          b_m = m_2 - 1;
          i = -1;
        }
      }
    }
    return r_m;
  }
}
