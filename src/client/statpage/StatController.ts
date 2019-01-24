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
		const response = await fetch("https://flask-ss-heroku.herokuapp.com/players/QB/?week=1",
		{
			method: "GET",
			headers: {
                "Content-Type" : 'application/JSON'
			}
		});

        let stats = await response.json();

        if(stats.length == 0){
            this.statTable.innerHTML = `No players can be found`;
        }
        else{
            for(let i = 0; i<stats.Data.length;i++){
                this.statTable.appendChild(this.FormatStats(stats.Data[i]));
            }
        }


        return stats;
    }

    private FormatStats(player:any): HTMLElement{
        let statTableDiv = document.createElement("tr");
        statTableDiv.className = "stat-table";
        statTableDiv.innerHTML = `
        <td class = "player-name">`+player.player_name+`</td>
        <td class = "player-team">`+player.player_team+`</td>
        <td>`+player.passing_yds+`</td>
        <td>`+player.passing_tds+`</td>
        <td>`+player.passing_att+`</td>
        <td>`+player.passing_cmp+`</td>
        <td>`+player.passing_int+`</td>`
        return statTableDiv;
    }

}