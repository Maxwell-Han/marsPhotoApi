console.log('hello from the index scripts.js')

const setPrevForm = () => {
  let form = document.getElementById('prev-page-form').elements
  let sol = form[0]
  let cam = form[1]
  let page = form[2]
  // set input values
  sol.value = document.querySelector('.current-sol').textContent
  cam.value = document.querySelector('.current-cam').textContent
  let currentPage = document.querySelector('.current-page').textContent
  page.value = parseInt(currentPage) - 1
}

const setNextForm = () => {
  let form = document.getElementById('next-page-form').elements
  let sol = form[0]
  let cam = form[1]
  let page = form[2]
  // set input values
  sol.value = document.querySelector('.current-sol').textContent
  cam.value = document.querySelector('.current-cam').textContent
  let currentPage = document.querySelector('.current-page').textContent
  page.value = parseInt(currentPage) + 1
}

const nextPageLink = document.querySelector('.goto-next')
const prevPageLink = document.querySelector('.goto-prev')
const nextPageForm = document.getElementById('next-page-form')
const prevPageForm = document.getElementById('prev-page-form')

const setPageLinkToSubmitForm = () => {
  nextPageLink.addEventListener('click', (e) => {
    e.preventDefault()
    nextPageForm.submit()
  })
  prevPageLink.addEventListener('click', (e) => {
    e.preventDefault()
    prevPageForm.submit()
  })

}

const gotoVal = document.querySelector('.goto-container input')
const gotoLink = document.querySelector('.goto-page')
const gotoForm = document.getElementById('goto-page-form')

const setGotoLinkToSubmitForm = () => {
  gotoLink.addEventListener('click', (e) => {
    e.preventDefault()
    setGotoForm()
    if(!gotoVal.value) return false
    gotoForm.submit()
  })
}

const setGotoForm = () => {
  let form = document.getElementById('goto-page-form').elements
  let sol = form[0]
  let cam = form[1]
  let page = form[2]
  // set input values
  sol.value = document.querySelector('.current-sol').textContent
  cam.value = document.querySelector('.current-cam').textContent
  page.value = parseInt(gotoVal.value)
}

document.addEventListener('DOMContentLoaded', () => {
  setNextForm()
  setPrevForm()
  setPageLinkToSubmitForm()
  setGotoLinkToSubmitForm()
})
