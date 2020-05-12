export default {
    items: [
      {
        title: true,
        name: 'Управління учнями',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Переглянути список',
        url: '/admin/students/groupId=0',
        icon: 'icon-list',
      },
      {
        name: 'Реєстрація учня',
        url: '/admin/addstudent',
        icon: 'icon-plus',
      },
      {
        title: true,
        name: 'Управління вчителями',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Переглянути список',
        url: '/admin/teachers',
        icon: 'icon-list',
        // children: [
        //   {
        //     name: 'Викладачі',
        //     url: '/base/breadcrumbs',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Куратори',
        //     url: '/base/cards',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Зав. відділенням',
        //     url: '/base/carousels',
        //     icon: 'icon-puzzle',
        //   } 
        // ],
      },
      {
        name: 'Реєстрація вчителя',
        url: '/admin/addteacher',
        icon: 'icon-plus',
        // children: [
        //   {
        //     name: 'Викладач',
        //     url: '/base/breadcrumbs',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Куратор',
        //     url: '/base/cards',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Зав. відділенням',
        //     url: '/base/carousels',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Голова цикл. комісії',
        //     url: '/base/carousels',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Зав. навч. кабінетом',
        //     url: '/base/carousels',
        //     icon: 'icon-puzzle',
        //   }
          
        // ],
      },
      {
        title: true,
        name: 'Результативність',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Переглянути оцінки',
        url: '/admin/marks',
        icon: 'icon-list',
      },
      {
        title: true,
        name: 'Робота з групами',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Переглянути групи',
        url: '/admin/getgroups',
        icon: 'icon-list',
      },
      {
        name: 'Додати групу',
        url: '/admin/addgroup',
        icon: 'icon-list',
      },
      {
        title: true,
        name: 'Розклад уроків',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Редагувати розклад',
        url: '/admin/change-timetable',
        icon: 'icon-calendar',
      },
      {
        title: true,
        name: 'Розподіл навантаження',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Редагувати розподіл навантаження',
        url: '/admin/load-distribution',
        icon: 'icon-notebook',
      },
      {
        title: true,
        name: 'Новини',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Додати новини',
        url: '/admin/add-news',
        icon: 'icon-envelope',
      },
      {
        name: 'Перегляд новин',
        url: '/admin/news',
        icon: 'icon-eyeglass',
      },
    ],
  };
  