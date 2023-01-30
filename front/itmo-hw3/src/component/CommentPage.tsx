import React, {Component, ReactNode}from "react";
import "./CommentPage.scss"
import axios from "axios"
let countName:number;
let countComment:number;
const GetallComments :string = 'http://localhost:8080//allComments';
/*function lenghtName(this: any, e: React.ChangeEvent<HTMLInputElement>) {

    countName=e.target.value.length;
    name=e.target.value;

 //   console.log(countName);

}*/

/*function lenghtComment(this: any, e: React.ChangeEvent<HTMLTextAreaElement>) {


    countComment=e.target.value.length;
    comm=e.target.value;
   // console.log(countComment);


}*/





export class CommentPage extends Component<any, any> {

    private timer:any;
    constructor(props:any) {
        super(props);
        this.state = {
            err_text: ""
        };
        this.state = {
            comment1: ""

        };
        this.state = {
            author1: ""

        };

        this.state = {
            test: false
        };
        this.state = {
            timer: ""
        };
        this.state = {
            stringData: []

        };


        this.get=this.get.bind(this)
        this.lenghtComment = this.lenghtComment.bind(this);
        this.lenghtName = this.lenghtName.bind(this);

    }
   // export const GetallComments = "http://localhost:8080/allComments"
    readonly PutComments = "http://localhost:8080/addComment"




    async componentDidMount(){
      this.get()
      this.timer = setInterval(this.get, 3000);

    }

    async get():Promise<any>{

        await axios.get(GetallComments)
            .then(res=> {
                this.setState({stringData: res.data});
                console.log(res.data);
            })
            .catch(err=>console.error(err))
           }


    omponentWillUnmount() {
        clearInterval(this.timer);
    }

    lenghtName(e: React.ChangeEvent<HTMLInputElement>) {

        countName=e.target.value.length;
      console.log(countName)
        this.setState({author1:e.target.value})
    }

    lenghtComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
        countComment=e.target.value.length;
      //  console.log(countComment)
        this.setState({comment1:e.target.value})
         console.log(countComment);
    }



    public render(): ReactNode {
       
        return (

            <div className="div-comments-page">

                <div><input value={this.state.author1  ||""}  onChange={this.lenghtName} type="text" name="name" placeholder="Ваше имя"></input></div>
                <div>
                    <textarea value={this.state.comment1} onChange={this.lenghtComment} id="message"  name="mess" placeholder="Ваш комментарий"/>
                </div>
                <div><button onClick={()=>this.handleOnSubmit()}>Добавить</button> </div>
                <div>
                   <ul> {this.state.stringData.map((x:any, i:any) =>
                                   <li key={i}>
                                   {x.author} {x.comment}


                                </li>

                    )
                    }</ul>
                  </div>
                <span>{this.state.err_text}</span>


            </div>
        )
    }
    handleOnSubmit() {
   if((countName ==0) || (countComment==0) || (countName==null) || (countComment==null)
   || (this.state.author1=="") || (this.state.comment1=="")){
       this.setState({err_text:"Не оставляйте поля пустыми"})
   }
   else {
       if (countName <= 300 && countComment <= 1000) {
           console.log("ок")
           this.CommentToServer()
           this.setState({err_text: ""})
           this.setState({author1: ""})
           this.setState({comment1: ""})
       } else {
           console.log("not ок");
           this.setState({err_text: "превышено количество символов"})
       }
   }
   }


    async CommentToServer(){
        await axios.post(this.PutComments,
            {author:this.state.author1,comment:this.state.comment1})
            .then(res=>console.log(res.data))
            .catch(err=>console.error(err))

    }

}
