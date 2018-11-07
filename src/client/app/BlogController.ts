import { json } from "body-parser";

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
                body: JSON.stringify({})
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
                    keywords: search
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
        blogDiv.onclick = () => {
            let win = window.open(blog.url, '_blank');
            win.focus();
        }
        blogDiv.innerHTML = `
        <p class = "blog-name" style = "font-size:25px; font-weight:bold">`+blog.title+`</p>
        <p class = "author">Author: <span class = "author-name">`+blog.author+`</span></p>
        <p class = "blog-time"><span class = "glyphicon glyphicon-time"></span>`+blog.publishedAt+`</p>
        <p class = "blog-text">`+blog.description+`</p>`
        return blogDiv;
    }

    /**
     * Populates an object where the keys are keywords, and the values are a list
     * of blog objects related to keywords.
     * TODO: make case insensitive, use partials instead of full, store index instead of full blog
     * @param blog the blog object to be identified
     * @modifies this.blogmap
     */
    private CreateBlogIdentifiers(blog:any){
        if(blog.blog_name){
            if(this.blogMap[blog.blog_name] == null){
                this.blogMap[blog.blog_name] = [];
            }
            this.blogMap[blog.blog_name].push(blog);
        }
    }

    /**
     * ClearBlogs: Removes all blogs from the DOM
     */
    private ClearBlogs(){
        while(this.blogContainer.firstChild){
            this.blogContainer.removeChild(this.blogContainer.firstChild);
        }
    }

    /**
     * GetBlogsByKeyword: a very simple implementations to search and return blogs mapped to a keyword
     * @param word the keyword to search the map for
     */
    public GetBlogsByKeyword(word:string){
        this.ClearBlogs();
        console.log(this.blogMap);
        if(this.blogMap[word]){
            this.PopulateBlogs(this.blogMap[word]);
        }
    }
}