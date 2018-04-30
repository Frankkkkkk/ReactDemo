import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';

 class Board extends React.Component{
   constructor(){
     super();
     this.state={comments:['111','222','333']};
   }

   updateComment(newText,i){
     console.log(newText);
     // var arr =this.state.comments;
     // arr[i]=newText
     // this.setState({comments:arr});
   }

   removeComment(i){
    var arr=this.state.comments;
    arr.splice(i,1,"");
    this.setState({comments:arr});
    //console.log(i);
   }

   eachComment(text,i){
     return(
       <Comment
         deleteFormBoard={this.removeComment}
         updateCommentText={this.updateComment}
         key={i} index={i}>{text}</Comment>
     );
   }

   add(text){
     var arr=this.state.comments;
     arr.push(text);
     // update state
     this.setState({comments:arr});
   }

   render(){
     return(
       <div>
         <button onClick={this.add.bind(null,"Default text")} className="button-info create">Add New</button>
         <div className="board">
           {
             this.state.comments.map(this.eachComment.bind(this))//在更新变量的时候需要使用。bind()实现数据更新。
           }
         </div>
       </div>
     );
   }
 }


class Comment extends React.Component{
  constructor(){
  super();
  this.state={editing:false}
  }
  edit(){
    this.setState({editing:true});
  }
  remove(){
    //alert("Removing comment!")
    this.props.deleteFormBoard(this.props.index);
  }
  save(){
    var val=this.refs.newText.value;
    //console.log("Get the comment:"+val);
    this.props.updateCommentText(val,this.props.index)
    this.setState({editing:false});
  }
  renderNormal(){
    return (
    <div className="commentroot">
      <div>{this.props.children}</div>
      <button onClick={this.edit.bind(this)} className="button-primary">Edit</button>
      <button onClick={this.remove.bind(this)} className="button-danger">Remove</button>
    </div>
    );
  }
  renderForm(){
    return(
    <div className="commentroot">
      <textarea ref="newText" defaultcomment={this.props.children}></textarea>
      <button onClick={this.save.bind(this)} className="button-success">Save</button>
    </div>
  );
  }
  render() {
    if(this.state.editing){
      return this.renderForm();
    }else{
      return this.renderNormal();
    }
  }
}
// class CheckBox extends React.Component{
//   constructor(){
//     super();
//     this.state={checked:false}
//   }
//   handleChange(){
//     this.setState({checked:!this.state.checked});
//   }
//   render(){
//     var msg;
//     if(this.state.checked){
//       msg= "checked"
//     }else{
//       msg="unchecked"
//     }
//     return(
//       <div>
//         <input type="checkbox" onChange={this.handleChange.bind(this)} />
//         <h3>Checkbox is {msg}</h3>
//       </div>
//     );
//   }
// }


// ========================================
//在调用的时候，如果想要调用多次组件，那么也需要给组建一个跟标签
  ReactDOM.render(
  // <div className="board">
  //   <Comment>11111</Comment>
  //   <Comment >22222</Comment>
  //   <Comment >33333</Comment>
  // </div>,
  <Board/>,
  document.getElementById('root')
);
