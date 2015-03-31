// tutorial on https://facebook.github.io/react/docs/tutorial.html

var converter = new Showdown.converter();
var Comment = React.createClass({displayName: "Comment",
    render : function(){
        var rawHtml = converter.makeHtml(this.props.children.toString());
        return (
            React.createElement("div", {className: "comment"}, 
                React.createElement("h2", {className: "commentAuthor"}, 
                    this.props.author
                ), 
                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawHtml}})
            )
        );
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render: function () {
        var commentNodes = this.props.data.map(function(comment){
            return (
                React.createElement(Comment, {author: comment.author}, comment.text)
            );
        });
        return (
            React.createElement("div", {className: "commentList"}, 
                commentNodes
            )
        );
    }
});

var CommentForm = React.createClass({displayName: "CommentForm",
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
            React.createElement("div", {className: "commentForm"}, 
                React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
                    React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
                    React.createElement("input", {type: "text", placeholder: "Say something", ref: "text"}), 
                    React.createElement("input", {type: "submit", value: "Post"})
                )
            )
        );
    }
});

var CommentBox = React.createClass({displayName: "CommentBox",
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
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comment Box with comments"), 
                React.createElement(CommentList, {data: this.state.data}), 
                React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
            )
        );
    }
});

React.render(
    React.createElement(CommentBox, {url: "comments.json", pollInterval: 2000}),
    document.getElementById('content')
);