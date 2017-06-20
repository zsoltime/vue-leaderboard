const dataset = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

function fetchData(url) {
  return fetch(url)
  .then(res => {
    if (!res.ok) {
      throw Error(`${res.status} ${res.statusText}`);
    }
    return res;
  })
  .then(res => res.json());
}

Vue.component('sort-button', {
  props: {
    size: {
      type: String,
      default: '24px',
    },
    color: {
      type: String,
      default: '#ccc',
    },
    classNames: {
      type: Object,
      default: () => ({
        sort: true,
      }),
    }
  },
  template: '\
    <button :class="classNames"> \
      <slot></slot> \
      <svg \
        xmlns="http://www.w3.org/2000/svg" \
        xmlns:xlink="http://www.w3.org/1999/xlink" \
        version="1.1" \
        :width="size" \
        :height="size" \
        viewBox="0 0 16 16">\
          <path :fill="color" d="M11 7h-6l3-4z" />\
          <path :fill="color" d="M5 9h6l-3 4z" />\
      </svg> \
    </button>',
});

Vue.component('modal', {
  template: '\
    <transition name="modal" mode="in-out"> \
      <div class="modal"> \
        <div class="modal__overlay" @click="$emit(\'close\')"></div> \
        <div class="modal__wrapper"> \
          <button class="modal__close" @click="$emit(\'close\')"> \
            &times; \
          </button> \
          <slot></slot> \
        </div> \
      </div> \
    </transition>',
});

Vue.component('rank', {
  template: '\
    <svg \
      xmlns="http://www.w3.org/2000/svg" \
      xmlns:xlink="http://www.w3.org/1999/xlink" \
      version="1.1" \
      viewBox="0 0 290.474 290.474" \
      width="96" \
      height="96"> \
      <path \
        style="fill:#555555;" \
        d="M169.278,184.712l-6.952-51.11c-0.448-3.271-1.69-6.21-3.41-8.757l4.214-8.429l-8.519-4.262 l-3.062,6.124c-2.976-1.5-6.324-2.267-9.829-1.952c-5.29,0.438-10.033,2.957-13.348,7.086c-3.267,4.067-4.733,9.367-4.029,14.533 l4.929,36.229l-36.919,90.205l6.619,2.71c3.671,1.5,5.438,5.714,3.938,9.386c-1.505,3.676-5.719,5.452-9.386,3.933l-39.838-16.305 c-3.671-1.5-5.438-5.71-3.938-9.386c1.505-3.671,5.719-5.433,9.386-3.933l6.624,2.71l5.433-13.281l11.086,4.538 c2.067,0.848,4.205,1.248,6.31,1.248c6.59,0,12.848-3.924,15.495-10.39c1.69-4.133,1.676-8.676-0.052-12.8 c-0.51-1.21-1.181-2.314-1.933-3.352c2.952-1.843,5.271-4.514,6.614-7.795c2.271-5.548,1.29-11.6-1.99-16.133 c2.876-1.79,5.248-4.448,6.624-7.814c2.271-5.552,1.286-11.61-2-16.143c2.957-1.843,5.286-4.514,6.633-7.8 c3.186-7.781,0.01-16.548-7.038-20.69l5.529-13.51l-6.624-2.7c-1.781-0.724-3.171-2.105-3.914-3.876 c-0.743-1.771-0.752-3.729-0.024-5.505c1.505-3.671,5.71-5.448,9.386-3.933l6.624,2.71l5.424-13.262l-8.814-3.61l-1.886,4.605 c-7.929-2-16.362,2.095-19.548,9.881c-1.69,4.133-1.676,8.676,0.052,12.8c1.414,3.381,3.843,6.138,6.952,7.957l-1.89,4.619 l-15.514-6.348c-8.548-3.5-18.314,0.614-21.805,9.143c-2.271,5.557-1.286,11.61,2.005,16.148c-2.876,1.79-5.257,4.433-6.633,7.8 c-2.271,5.552-1.286,11.61,2,16.143c-2.876,1.79-5.252,4.433-6.633,7.8c-2.271,5.552-1.286,11.61,2,16.143 c-2.957,1.843-5.286,4.519-6.629,7.805c-3.49,8.529,0.605,18.314,9.138,21.805l2.233,0.914l-1.89,4.619 c-7.943-2.01-16.362,2.1-19.548,9.881c-3.49,8.533,0.61,18.319,9.138,21.81l39.838,16.305c2.067,0.848,4.205,1.248,6.31,1.248 c6.59,0,12.852-3.924,15.5-10.39c3.186-7.79,0.043-16.619-7.014-20.752l2.824-6.9l0.757,0.31 c10.052,4.114,21.476,2.919,30.457-3.043l84.89,34.738l27.157-66.367L169.278,184.712z M68.383,202.931 c-3.671-1.5-5.438-5.71-3.938-9.386c1.5-3.657,6.033-5.419,9.69-3.943l18.067,6.448v-0.814c0,0-0.657,0-0.652,0l4.414,2.619 c3.671,1.5,5.438,6.119,3.933,9.79c-0.724,1.781-2.1,3.371-3.876,4.114c-1.771,0.743-3.724,0.857-5.495,0.129l-7.729-3.11 L68.383,202.931z M73.012,179.065c-3.671-1.5-5.438-5.752-3.933-9.424c1.5-3.676,5.705-5.448,9.371-3.957l7.724,3.152 l14.419,5.895c3.671,1.5,5.438,5.71,3.938,9.381c-1.5,3.657-5.705,5.5-9.367,4.014l-17.729-7.176c-0.005,0-0.01,0-0.014,0 L73.012,179.065z M73.707,145.66c1.143-2.786,3.833-4.471,6.671-4.471c0.905,0,1.824,0.171,2.714,0.538l22.133,9.057 c3.671,1.5,5.438,5.71,3.933,9.386c-0.724,1.781-2.1,3.167-3.871,3.91c-1.767,0.738-3.724,0.757-5.51,0.019l-11.129-4.41 l-6.581-2.548c-0.005,0-0.005,0-0.01,0l-4.414-1.952C73.969,153.688,72.202,149.331,73.707,145.66z M59.84,223.003 c-0.743-1.771-0.752-3.729-0.019-5.51c0.729-1.776,2.1-3.167,3.871-3.905c0.895-0.376,1.838-0.567,2.781-0.567 c0.924,0,1.848,0.181,2.729,0.543l4.295,1.757l13.405,5.486c0.005,0.005,0.014,0.005,0.019,0.005l4.405,1.805 c1.781,0.724,3.171,2.105,3.914,3.876c0.743,1.771,0.752,3.729,0.024,5.505c-0.729,1.781-2.105,3.167-3.881,3.91 c-1.767,0.743-3.724,0.757-5.505,0.024l-22.133-9.057C61.969,226.15,60.583,224.774,59.84,223.003z M218.431,272.007 l-81.119-33.195l-2.186,1.748c-6.567,5.243-15.471,6.533-23.224,3.357l-0.757-0.305l27.905-68.19l-5.271-38.762 c-0.357-2.633,0.362-5.219,2.019-7.29c1.662-2.071,4.048-3.333,6.705-3.557c4.995-0.419,9.643,3.657,10.386,9.071l7.69,56.562 l77.79,31.833L218.431,272.007z"/> \
      <path \
        style="fill:#f9bb44;" \
        d="M228.012,70.041l-34.5-20.338c-2.267-1.338-4.271-4.576-4.452-7.2l-2.805-39.948  c-0.186-2.624-1.948-3.348-3.919-1.605l-30.005,26.524c-1.971,1.743-5.671,2.648-8.224,2.01l-38.857-9.676  c-2.552-0.633-3.786,0.819-2.738,3.233l15.957,36.733c1.048,2.414,0.767,6.214-0.629,8.443l-21.214,33.967  c-1.395,2.233-0.39,3.852,2.229,3.6l39.867-3.824c2.619-0.252,6.143,1.19,7.838,3.205l25.748,30.671  c1.69,2.014,3.543,1.562,4.114-1.005l8.681-39.095c0.571-2.567,3.033-5.476,5.471-6.462l37.129-15.01  C230.135,73.279,230.278,71.379,228.012,70.041z"/> \
      <text \
        fill="#555555" \
        font-size="48" \
        x="150" \
        y="85" \
        text-anchor="middle" \
        transform="rotate(25, 150, 85)" \
        > \
        <slot></slot> \
      </text> \
    </svg>',
});

new Vue({
  el: '#app',
  data: {
    activeCamper: null,
    campers: [],
    error: null,
    isFetching: true,
    order: -1,
    showModal: false,
    sortBy: 'alltime',
  },
  created: function() {
    document.addEventListener('keydown', this.handleKeydown);
    fetchData(dataset)
      .then(this.updateRanks)
      .then(res => {
        this.campers = res;
        this.isFetching = false;
        return res;
      })
      .catch((err) => {
        this.error = err.message;
        console.error(err.message);
      });
  },
  beforeDestroy: function() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    sort: function(col) {
      if (col === this.sortBy) {
        this.order *= -1;
      } else {
        this.sortBy = col;
      }
    },
    showUserCard: function(i) {
      this.showModal = true;
      this.activeCamper = i;
    },
    updateRanks: function(campers) {
      const sortedByAlltime = campers.slice()
        .sort((a, b) => b.alltime - a.alltime);
      const ranks = campers.slice()
        .map(camper => (sortedByAlltime
          .findIndex(x => x.alltime === camper.alltime) + 1)
        );

      return campers.map((camper, index) => (
        Object.assign({}, camper, {
          rank: {
            alltime: ranks[index],
            recent: index + 1,
          },
        })
      ));
    },
    handleKeydown: function(e) {
      if (!this.showModal || e.key !== 'Escape') { return; }
      this.showModal = false;
    },
  },
  computed: {
    sortedList: function() {
      return this.campers.sort((a, b) => {
        if (this.order === 1) {
          return a[this.sortBy] - b[this.sortBy];
        } else {
          return b[this.sortBy] - a[this.sortBy];
        }
      });
    },
    recentClass: function() {
      return {
        'sort': true,
        'sort--desc': this.order === -1,
        'sort--asc': this.order === 1,
        'sort--active': this.sortBy === 'recent'
      };
    },
    alltimeClass: function() {
      return {
        'sort': true,
        'sort--desc': this.order === -1,
        'sort--asc': this.order === 1,
        'sort--active': this.sortBy === 'alltime'
      };
    },
    fccLink: function() {
      return `https://www.freecodecamp.com/${this.campers[this.activeCamper].username}`;
    }
  },
  filters: {
    number: function(num) {
      return new Intl.NumberFormat().format(num);
    },
    ordinal: function(num) {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const v = num % 100;
      return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }
  },
});
