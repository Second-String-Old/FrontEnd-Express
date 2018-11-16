
export class BlogController{
    private blogContainer:HTMLDivElement;
    private blogList: any; //this will be an array of blog objects
    private blogMap: any; //this will be a map of blog objects to keywords

    constructor(container:HTMLDivElement){
        this.blogContainer = container;
        this.blogMap = {};
        this.FetchBlogs();
    }
    /**
     * FetchBlogs: Gets array of blog objects from server
     */
    public async FetchBlogs(search: string = ""){
        //fetch the blogs
        let response;
        if(search === ""){
            response = await fetch("/getBlogs",
            {
                method: "POST",
                headers: {
                    "Content-Type" : 'application/JSON'
                },
                body: JSON.stringify({
                    keywords: "",
                    page: 1
                })
            });
        }
        else{
            response = await fetch("/getBlogs",
            {
                method: "POST",
                headers: {
                    "Content-Type" : 'application/JSON'
                },
                body: JSON.stringify({
                    keywords: search,
                    page: 1
                })
            });
        }
        let blogs = await response.json();
        this.ClearBlogs();
        console.log(blogs);
        this.blogList = blogs;
        this.PopulateBlogs(this.blogList);
    }

    /**
     *PopulateBlogs: Iterates through a list of blog objects and adds them to the page
    */
    public async PopulateBlogs(bloglistloc: any){
        console.log("Populating Blogs");
        if(bloglistloc.length == 0){
            this.blogContainer.innerHTML = `It looks as though no blogs are available`;
        }
        else{
            //loops through blog objects
            for(let i = 0; i<bloglistloc.length;i++){
                this.blogContainer.appendChild(this.FormatBlogs(bloglistloc[i]));
            }
        }
    }

    /**
     * FormatBlogs: create a formatted blog HTML element
     * @param blog a java script object representing a blog
     * @returns HTMLElement, representing a blog post
     */
    private FormatBlogs(blog:any): HTMLElement{

        let blogDiv = document.createElement("div");
        blogDiv.className = "blog-post";
        blogDiv.onclick = () => { //open the real site if blog is clicked
            let win = window.open(blog.url, '_blank');
            win.focus();
        }

        let textflex = document.createElement("div");
        textflex.className = "blog-post-icontainer";
        textflex.id = "text-flex"

        let imgflex = document.createElement("div");
        imgflex.className = "blog-post-icontainer";
        imgflex.id = "imgflex";

        if(blog.title != null){
            let title = document.createElement("p");
            title.className = 'blogs-title';
            title.innerText = blog.title;
            textflex.appendChild(title);
        }
        if(blog.urlToImage != null){
            let img = document.createElement("img");
            img.className = "blog-image";
            img.src = blog.urlToImage;
            img.alt = "Image";
            imgflex.appendChild(img);
        }
        if(blog.author != null){
            let author = document.createElement('p');
            author.className = "blog-author";
            author.innerText = "Author: "+blog.author+"\n";
            textflex.appendChild(author);
        }
        if(blog.publishedAt != null){
            let time = document.createElement('p');
            time.className = "blog-time";
            let realtime = this.formatTime(blog.publishedAt);
            time.innerHTML = '<span class = "tspan"><img class = "ticon" src = "/static/images/time.svg">'+realtime[0]+"  "+realtime[1]+"</span>";
            imgflex.appendChild(time);
        }
        if(blog.description != null){
            let desc = document.createElement("p");
            desc.className = "blog-text";
            desc.innerText = blog.description;
            textflex.appendChild(desc);
        }
        blogDiv.appendChild(textflex);
        blogDiv.appendChild(imgflex);
        return blogDiv;
    }

    /**
     * ClearBlogs: Removes all blogs from the DOM
     */
    private ClearBlogs(){
        while(this.blogContainer.firstChild){
            this.blogContainer.removeChild(this.blogContainer.firstChild);
        }
    }

    private formatTime(timestring: string): Array<string>{
        let timearr: Array<string> = [];
        let splittedarr = timestring.split("T");
        console.log(splittedarr);
        if(splittedarr.length < 2){
            return timearr;
        }
        let time = splittedarr[1].split(":");
        if(time.length < 3){
            return timearr;
        }
        let realtime = time[0]+":"+time[1];
        return [splittedarr[0],realtime];
    }
}