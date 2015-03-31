// tutorial on https://facebook.github.io/react/docs/tutorial.html

var converter = new Showdown.converter();
var Comment = React.createClass({
    render : function(){
        var rawHtml = converter.makeHtml(this.props.children.toString());
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawHtml}} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author}>{comment.text}</Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit : function(e){
        e.preventDefault();
        var author = React.findDOMNode(this.refs.author).value.trim();
        var text = React.findDOMNode(this.refs.text).value.trim();

        if(!text || !author){
            console.log("Erreur");
            return;
        }

        this.props.onCommentSubmit({author: author, text: text});

        React.findDOMNode(this.refs.author).value = "";
        React.findDOMNode(this.refs.text).value = "";
        return ;
    },

    render: function () {
        return (
            <div className="commentForm">
                <form className="commentForm" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Your name" ref="author" />
                    <input type="text" placeholder="Say something" ref="text"/>
                    <input type="submit" value="Post" />
                </form>
            </div>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState : function(){
        return {data: []};
    },
    loadCommentsFromServer : function(){
        $.ajax({
            url: this.props.url,
            dataType: "json",
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error : function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function(){
        //this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    handleCommentSubmit : function(comment){
        $.ajax({
            url: this.props.url,
            type: "POST",
            dataType:"json",
            data: comment,
            success : function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comment Box with comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

React.render(
    <CommentBox url="comments.json" pollInterval={2000}/>,
    document.getElementById('content')
);