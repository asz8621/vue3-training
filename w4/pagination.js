export default{
    props:['page', 'allPage'],
    data() {
      return {
      };
    },
    mounted() {
    },
    template:`<nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': page === 1}" @click="$emit('changePage', 'prev')">
          <a class="page-link" href="#">Prev</a>
        </li>
        <li v-for="(item, key) in allPage" :key="key" class="page-item" :class="{'active': page === item}" @click="$emit('changePage', item)">
          <a class="page-link" href="#">{{item}}</a>
        </li>
        <li class="page-item" :class="{'disabled': page === allPage}" @click="$emit('changePage', 'next')">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>`,
}