// tutorial on https://facebook.github.io/react/docs/tutorial.html

var CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                Hello world I am a CommentList
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
                Hello I am a commentForm
            </div>
        );
    }
});

var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comment Box with comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

React.render(
    <CommentBox />
    ,
    document.getElementById('content')
);