export default{
    props:['singleData', 'modalTitle', 'categoryList'],
    data() {
      return {
        componentModal: null,
      };
    },
    mounted() {
      this.componentModal = new bootstrap.Modal(this.$refs.updateModal);
    },
    methods: {
      openModal() {
        this.componentModal.show()
      },
      closeModal() {
        this.componentModal.hide()
      }
    },
    template:`<div ref="updateModal" class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="category" class="form-label">分類</label>
                <select id="category" class="form-select" aria-label="Default select example" v-model="singleData.category">
                  <option value="" selected disabled>請選擇</option>
                  <option :value="item.val" v-for="item in categoryList" :key="item.id">{{ item.val }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label">產品名稱</label>
                <input type="text" class="form-control" id="productName" placeholder="請輸入產品名稱" v-model="singleData.title">
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label">售價</label>
                <input type="number" class="form-control" id="productName" placeholder="請輸入產品名稱" v-model="singleData.origin_price">
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label">折價</label>
                <input type="number" class="form-control" id="productName" placeholder="請輸入產品名稱" v-model="singleData.price">
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label">單位</label>
                <input type="text" class="form-control" id="productName" placeholder="請輸入產品名稱" v-model="singleData.unit">
              </div>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="singleData.is_enabled">
                <label class="form-check-label" for="flexSwitchCheckChecked">是否啟用</label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="$emit('entryProduct')">確定</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>`,
}