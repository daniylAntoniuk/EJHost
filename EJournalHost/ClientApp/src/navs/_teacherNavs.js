export default {
    items: [
      // {
      //   name: 'Login',
      //   url: '/teacher',
      //   icon: 'icon-speedometer',
      // },
      {
        title: true,
        name: 'Розклад',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Розклад',
        url: '/teacher/timetable',
        icon: 'icon-calendar',
      },
      // {
      //   name: 'Календарне планування',
      //   url: '/teacher/clients',
      //   icon: 'icon-calendar',
      // },
      {
        title: true,
        name: 'Робота з учнями',
        wrapper: {
          element: '',
          attributes: {},
        },
      },
      {
        name: 'Оцінки',
        url: '/base',
        icon: 'icon-check',
        children: [
          {
            name: 'Виставлення поточних',
            url: '/teacher/set-marks',
            icon: 'icon-notebook',
          },
          {
            name: 'Виставлення тематичних',
            url: '/base/cards',
            icon: 'icon-calculator',
          },
          {
            name: 'Перегляд',
            url: '/teacher/getmarks',
            icon: 'icon-eyeglass',
          },
        ],
      },
      {
        name: 'Домашє завдання',
        url: '/buttons',
        icon: 'icon-folder-alt',
        children: [
          {
            name: 'Завантаження',
            url: '/buttons/buttons',
            icon: 'icon-envelope-letter',
          },
          {
            name: 'Перегляд',
            url: '/buttons/button-dropdowns',
            icon: 'icon-eyeglass',
          },
        ],
      },
      {
        name: 'Перегляд студентів',
        url: '/teacher/seestudents',
        icon: 'icon-eyeglass',
      },
    ],
  };
  