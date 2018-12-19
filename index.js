const $ = q => document.querySelector.call(document, q);
(function(window){
    const toArr = o => Array.prototype.slice.call(o)
    const default_html = `<div class="row row-gap"><div class="col"><button type="button" name="button" class=" btn btn-block btn-blue">.primary</button></div><div class="col"><button type="button" name="button" class=" btn btn-block btn-blue ripple">.ripple</button></div><div class="col"><button type="button" name="button" class=" btn btn-block btn-blue ripple-inner">.inner</button></div><div class="col"><button type="button" name="button" class=" btn btn-block btn-blue ripple-outer">.outer</button></div></div>`
    
    function seletorify($ele) {
        let selector = $ele.localName
        if ($ele.id) selector += "#" + $ele.id
        if ($ele.className) selector += "." + $ele.className.split(" ").join(".")
        return selector
    }
    window.app = new Poi({
        el: "#app",
        tpl: "#treeTpl",
        data: {
            innerHtml: "",
            TreeLi() {
                let $root = document.createElement("div");
                $root.innerHTML = this.innerHtml
    
                function inner(childs, outer) {
                    let arr = toArr(childs)
                    let ret = ""
                    for (const c of arr) {
                        ret +=
                            `<li>
                                    ${seletorify(c)}
                                    ${c.children.length != 0?inner(c.children,"ul"):""}
                                    </li>`
                    }
                    return outer ? `<${outer}>${ret}</${outer}>` : ret
                }
                return inner($root.children)
            }
        },
        mounted: {
            init() {
                try {
                    this.innerHtml = decodeURIComponent(window.location.hash.length > 0 ? window.location.hash.substring(1) : default_html)
                } catch (err) {
                    console.log(err.message)
                    console.log("use default template")
                    this.innerHtml = default_html
                }
            }
        }
    })
})(window);