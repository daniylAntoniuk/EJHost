export default {
    items: [
      {
        name: 'Login',
        url: '/manager',
        icon: 'icon-speedometer',
      },
      {
        title: true,
        name: 'Робота з користувачами',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Список студентів',
        url: '/manager/students',
        icon: 'icon-user',
      },
      {
        name: 'Список викладачів',
        url: '',
        icon: 'icon-people',
      },
      {
        title: true,
        name: 'Навчальний процес',
        wrapper: {
          element: '',
          attributes: {},
        },
      },
      {
        name: 'Корегування розкладу',
        url: '',
        icon: 'icon-check',
        children: [
          {
            name: 'Поставити заміни',
            url: '',
            icon: 'icon-notebook',
          },
          {
            name: 'Добавлення розкладу',
            url: '/base/cards',
            icon: 'icon-bookmark',
          },
          {
            name: 'Перегляд',
            url: '/base/carousels',
            icon: 'icon-eyeglass',
          },
        ],
      },
    ],
  };
  