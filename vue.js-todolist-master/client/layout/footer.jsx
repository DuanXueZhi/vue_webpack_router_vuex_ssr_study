// import className from '../assets/styles/footer.styl'
import '../assets/styles/footer.styl'

export default {
  data() {
    return {
      author: 'no one'
    }
  },
  render(h) {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
