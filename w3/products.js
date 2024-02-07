import { apiUrl, apiPath } from './all.js';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';

const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      apiUrl,
      apiPath,
      selectModal: null,
      thead: [
        {
          name: '產品名稱',
          class: 'text-center',
        },
        {
          name: '類型',
          class: 'text-center',
        },
        {
          name: '原價',
          class: 'text-center',
        },
        {
          name: '售價',
          class: 'text-center',
        },
        {
          name: '狀態',
          class: 'text-center',
        },
        {
          name: '操作',
          class: 'text-center',
        },
      ],
      categoryList: [
        {
          id: 1,
          val: '飲料',
        },
        {
          id: 2,
          val: '餅乾',
        },
      ],
      products: [],
      productLen: null,
      selectProduct: {},
      singleData: {},
      modalType: null,
    }
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)adminToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkUser();
    console.log('uuid.v4()', this.uuid())
  },
  methods: {
    uuid() {
      const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    checkUser() {
      axios.post(`${apiUrl}/api/user/check`).then(res => {
        this.getData()
      }).catch(err => {
        console.error(err);
        window.location = 'login.html';
      });
    },
    getData() {
      axios.get(`${apiUrl}/api/${this.apiPath}/admin/products`).then(res => {
        this.products = res.data.products;
        this.productLen = res.data.products.length;
      }).catch(err => {
        console.error(err);
        window.location = 'login.html';
      });
    },
    productDetail(data) {
      this.selectProduct = data;
    },
    entryProduct() {
      if (this.modalType === 'add') {
        this.addProduct();
      } else {
        this.editProduct();
      }
    },
    addProduct() { // 新增
      const data = {
        ...this.singleData,
      }
      axios.post(`${apiUrl}/api/${this.apiPath}/admin/product`, {data}).then(res => {
        // console.log('res', res)
        this.getData()
        toast(res.data.message, {
          "autoClose": 3000,
          "theme": "auto",
          "type": "success",
          "dangerouslyHTMLString": true,
        })
        this.selectModal.hide()
      }).catch(err => {
        console.error(err);
      });
    },
    editProduct() { // 編輯
      const data = {
        ...this.singleData,
      }
      axios.put(`${apiUrl}/api/${this.apiPath}/admin/product/${this.singleData.id}`, {data}).then(res => {
        this.getData()
        toast(res.data.message, {
          "autoClose": 3000,
          "theme": "auto",
          "type": "success",
          "dangerouslyHTMLString": true,
        })
        this.selectModal.hide()
      }).catch(err => {
        console.error(err);
      });
    },
    delProduct() { // 刪除
      axios.delete(`${apiUrl}/api/${this.apiPath}/admin/product/${this.singleData.id}`).then(res => {
        this.getData()
        toast(res.data.message, {
          "autoClose": 3000,
          "theme": "auto",
          "type": "success",
          "dangerouslyHTMLString": true,
        })
        this.selectModal.hide()
      }).catch(err => {
        console.error(err);
      });
    },
    openModal(type, item) {
      this.selectModal = null
      this.modalType = type
      console.log(this.$refs)
      switch (type) {
        case 'add':
          this.singleData = {
            category: null,
            content: null,
            description: null,
            id: this.uuid(),
            is_enabled: 1,
            origin_price: null,
            price: null,
            title: null,
            unit: null,
            num: null,
            imageUrl: null,
            imagesUrl: [],
          }
          this.selectModal = new bootstrap.Modal(this.$refs.entryModal)
          break;
        case 'edit':
          this.singleData = { ...item }
          this.selectModal = new bootstrap.Modal(this.$refs.entryModal)
          break;
        case 'del':
          this.singleData = { ...item }
          this.selectModal = new bootstrap.Modal(this.$refs.delModal)
          break;
        default:
          break;
      }
      this.selectModal.show()
    }
  },
});
app.mount('#app');