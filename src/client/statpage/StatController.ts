export class StatController{
    private statTable:HTMLDivElement;

    constructor(table:HTMLDivElement){
        this.statTable = table;
    }

    /**
     *Purpose: fetch json object from server containing blogs, the place json objects into HTML containers
     * 
     *  
    */
    public async PopulateTable(){
        console.log("Populating Table");

        //fetch the blogs
		const response = await fetch("/getStats",
		{
			method: "GET",
			headers: {
				"Content-Type" : 'application/JSON'
			}
		});

        let stats = await response.json();
        console.log(stats);

        if(stats.length == 0){
            this.statTable.innerHTML = `No players can be found`;
        }
        else{
            for(let i = 0; i<stats.length;i++){
                this.statTable.appendChild(this.FormatStats(stats[i]));
            }
        }


        return stats;
    }

    private Formatstats(player:any): HTMLElement{
        const playerFName = player.lname;
        const playerLName = player.fname;
        const playerTeam = player.team;
        const playerPos = player.pos;

        let statTableDiv = document.createElement("div");
        statTableDiv.className = "stat-table";
        statTableDiv.innerHTML = `
        <p class = "player-name" style = "font-size:25px; font-weight:bold">`+playerLName+`, `+playerFName+`</p>
        <p class = "player-team">Author: <span class = "author-name">`+playerTeam+`</span></p>
        <p class = "player-pos"><span class = "glyphicon glyphicon-time"></span>`+playerPos+`</p>`

        return statTableDiv;
    }

}