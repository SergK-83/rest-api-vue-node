import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import './style.css';

Vue.component('loader', {
  template: `
    <div class="loader">
      <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
    </div>
  `
});

new Vue({
  el: '#app',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        value: ''
      },
      contacts: []
    }
  },
  computed: {
    canCreate() {
      return this.form.value.trim() && this.form.name.trim();
    }
  },
  methods: {
    createContact() {
      const {...contact} = this.form;

      this.contacts.unshift({...contact, id: Date.now(), marked: false});

      console.log(this.contacts);

      this.form.name = this.form.value = '';
    },
    markContact(id) {
      const contact = this.contacts.find(c => c.id === id);
      contact.marked = !contact.marked;
    },
    removeContact(id) {
      this.contacts = this.contacts.filter(c => c.id !== id);
    }
  },
  async mounted() {
    this.loading = true;
    this.contacts = await request('/api/contacts');
    this.loading = false;
  }
});

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    }).then(data => data.json());

    return response;

  } catch (e) {
    console.warn('Error', e.message);
  }
}
