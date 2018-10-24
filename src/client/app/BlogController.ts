export class BlogController{
    private blogContainer:HTMLDivElement;
    private blogMap: any;

    constructor(container:HTMLDivElement){
        this.blogContainer = container;
        this.blogMap = {};
    }

    /**
     *Purpose: fetch json object from server containing blogs, the place json objects into HTML containers
     * 
     *  
    */
    public async PopulateBlogs(){
        console.log("Populating Blogs");

        //fetch the blogs
		const response = await fetch("/getBlogs",
		{
			method: "GET",
			headers: {
				"Content-Type" : 'application/JSON'
			}
		});

        let blogs = await response.json();
        console.log(blogs);

        if(blogs.length == 0){
            this.blogContainer.innerHTML = `It looks as though no blogs are available`;
        }
        else{
            for(let i = 0; i<blogs.length;i++){
                this.blogContainer.appendChild(this.FormatBlogs(blogs[i]));
            }
        }


        return blogs;
    }

    private FormatBlogs(blog:any): HTMLElement{
        const blogName = blog.blog_name;
        const blogAuth = blog.author;
        const blogTime = blog.date;
        const blogText = blog.text;

        let blogDiv = document.createElement("div");
        blogDiv.className = "blog-post";
        blogDiv.innerHTML = `
        <p class = "blog-name" style = "font-size:25px; font-weight:bold">`+blogName+`</p>
        <p class = "author">Author: <span class = "author-name">`+blogAuth+`</span></p>
        <p class = "blog-time"><span class = "glyphicon glyphicon-time"></span>`+blogTime+`</p>
        <p class = "blog-text">`+blogText+`</p>`

        return blogDiv;
    }

    private CreateBlogIdentifiers(name:string = null,author:string = null,date:string = null,identifiers: Array<string> = null, blog:HTMLDivElement){
        if(name){
            if(this.blogMap[name] == null){
                this.blogMap[name] = [];
            }
            this.blogMap[name].push(blog);
        }

        if(author){
            if(this.blogMap[author] == null){
                this.blogMap[author] = [];
            }
            this.blogMap[author].push(blog);
        }

        if(date){
            if(this.blogMap[date] == null){
                this.blogMap[date] = [];
            }
            this.blogMap[date].push(blog);
        }
        //add 
    }
}