export default{
    props:['singleData', 'modalTitle'],
    data() {
      return {
        componentModal: null,
      };
    },
    mounted() {
      this.componentModal = new bootstrap.Modal(this.$refs.deleteModal);
    },
    methods: {
      openModal() {
        this.componentModal.show()
      },
      closeModal() {
        this.componentModal.hide()
      }
    },
    template:`<div ref="deleteModal" class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>你確定要刪除此筆資料嗎?</p>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="$emit('delProduct')">確定</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>`,
}