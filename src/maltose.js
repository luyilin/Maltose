(() => {
    class maltose {
        constructor(option) {
            const defaultConfig = {
                wrap: document.getElementsByClassName('maltose')[0],
                target: document.getElementsByTagName('textarea')[0],
                width: '100%',
                maxHeight: '200px',
                api: '../demo/maltose.json'
            };
            for(let i in defaultConfig) {
                if (defaultConfig.hasOwnProperty(i) && !option.hasOwnProperty(i)) {
                    option[i] = defaultConfig[i]
                }
            }
            this.wrap = option.wrap
            this.target = option.target

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        this.data = JSON.parse(xhr.responseText)
                        this.init(option)
                    } else {
                        console.log('Request for emoticon resource was unsuccessful (｡•́︿•̀｡), the status code is ' + xhr.status)
                    }
                }
            }
            xhr.open('get', option.api)
            xhr.send(null)

        }
        init(option) {
            this.content = Object.keys(this.data)
            let html = `<div class="maltose-logo"><span>•́ωก̀ 表情</span></div>
                        <div class="maltose-main" style="width: ${option.width};">`
            for(let i = 0; i < this.content.length; i++) {
                html += `<ul class="maltose-ul maltose-ul-${this.data[this.content[i]].type}" style="max-height: ${parseInt(option.maxHeight) - 40 +'px'};">`
                let li = this.data[this.content[i]].container
                for(let i = 0; i < li.length; i++) {
                    html += `<li class="maltose-li" title="${li[i].text}">${li[i].icon}</li>`
                }
                html += `</ul>`
            }

            html += `<ul class="maltose-title">`
            for(let i = 0; i < this.content.length; i++) {
                html += `<li class="maltose-tab">${this.content[i]}</li>`
            }
            html += `<li class="maltose-tab random-tab">random!</li>`
            html += `</ul></div>`

            this.wrap.innerHTML = html

            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('maltose-logo') || e.target.parentNode.classList && e.target.parentNode.classList.contains('maltose-logo')) {
                    this.target.focus()
                    this.toggle()
                }
                else if (e.target.localName !== 'textarea') {
                    this.target.blur()
                    if (this.wrap.classList.contains('maltose-show')) {
                        this.wrap.classList.remove('maltose-show')
                    }
                }
            })

            let main = document.getElementsByClassName('maltose-main')[0]
            main.addEventListener('click', (j) => {
                event.stopPropagation()
                let content = null
                if (j.target.classList.contains('maltose-li')) {
                    content = j.target
                } else if (j.target.parentNode.classList.contains('maltose-li')) {
                    content = j.target.parentNode
                }
                if (content) {
                    let inner = content.innerHTML,
                        encodeInner = encodeURI(inner),
                        decodeInner = decodeURI(encodeInner),
                        cursorEnd = this.target.selectionEnd,
                        targetValue = this.target.value;
                    this.target.value = targetValue.slice(0, cursorEnd) + decodeInner + targetValue.slice(cursorEnd);
                    this.target.focus()
                    this.toggle()

                    console.log(decodeInner)
                }
            })

            let title = document.getElementsByClassName('maltose-title')[0];
            for(let i = 0; i < title.children.length; i++) {
                title.children[i].addEventListener('click', () => {
                    this.changeTab(i)
                })
            }
            this.changeTab(0)

            document.getElementsByClassName('random-tab')[0].addEventListener('click', () => {
                this.random()
            })
        }
        toggle() {
            let main = document.getElementsByClassName('maltose-show')[0]
            if (main) {
                main.classList.remove('maltose-show')
            } else {
                this.wrap.classList.add('maltose-show')
            }
        }
        changeTab(i) {
            if (i > 3) return
            let tab = document.getElementsByClassName('tab-show')[0]
            if (tab) {
                tab.classList.remove('tab-show')
            }
            document.getElementsByClassName('maltose-tab')[i].classList.add('tab-show')
            let ulContent = document.getElementsByClassName('maltose-ul-show')[0]
            if (ulContent) {
                ulContent.classList.remove('maltose-ul-show')
            }
            document.getElementsByClassName('maltose-ul')[i].classList.add('maltose-ul-show')
        }
        random() {
            let i = Math.floor(Math.random() * this.content.length)
            let j = Math.floor(Math.random() * this.data[this.content[i]].container.length)
            let random = this.data[this.content[i]].container[j].icon
            let cursorEnd = this.target.selectionEnd;
            let targetValue = this.target.value;
            this.target.value = targetValue.slice(0, cursorEnd) + random + targetValue.slice(cursorEnd);
            this.target.focus()
            this.toggle()
        }
    }

    // if (typeof define === "function" && define.amd){
    //     define(maltose)
    // }
    // else 
    if (typeof module != "undefined" && typeof module.exports != "undefined"){
        module.exports = maltose
    }
    else {
        window.maltose = maltose
    }
})();