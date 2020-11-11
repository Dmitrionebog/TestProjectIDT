function createRemarkable() {
    var remarkable =
        'undefined' != typeof global && global.Remarkable
            ? global.Remarkable
            : window.Remarkable;

    return new remarkable();
}

class CommentList extends React.Component {
    render() {
        const commentNodes = this.props.data.map(comment => (
            <Comment author={comment.author} key={comment.id}>
                {comment.text}
            </Comment>
        ));
        return <div className="commentList">{commentNodes}</div>;
    }
}

class Comment extends React.Component {
    rawMarkup() {
        const md = createRemarkable();
        const rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
}


class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { author: '', text: '' };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }
    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const author = this.state.author.trim();
        const text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    }
    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
}

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: this.props.initialData };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    loadCommentsFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }

    handleCommentSubmit(comment) {
        const comments = this.state.data;
        comment.id = comments.length + 1;
        const newComments = comments.concat([comment]);
        this.setState({ data: newComments });

            const data = new FormData();
            data.append('Author', comment.author);
            data.append('Text', comment.text);
            fetch('/comments/new', {
            method: 'POST',
                body: data
            }).then(onload = () => this.loadCommentsFromServer());
    }

    componentDidMount() {
        window.setInterval(
            () => this.loadCommentsFromServer(),
            this.props.pollInterval,
        );
    }
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}

class TestTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resultFromServer: '' };
        this.handleTechStackSubmit = this.handleTechStackSubmit.bind(this);
    }
    handleTechStackSubmit(inputData) {
        inputData.techStack = inputData.techStack.split(' ');
        let data = JSON.stringify(inputData);


        fetch('/techStack/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then(res => res.text().then(text => this.setState({ resultFromServer: text})));
    }

    render() {
        return (
            <div className="TestTask">
                <h1>Test task for IDT</h1>
                <TestInput onTechStackSubmit={this.handleTechStackSubmit} />
                <TestOutput writeResult={this.state.resultFromServer} />
            </div>
        );
    }
}

class TestInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { techStack: ''};
        this.handleTechStackChange = this.handleTechStackChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleTechStackChange(e) {
        this.setState({ techStack: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const techStack = this.state.techStack.trim();
        if (!techStack) {
            return;
        }
        this.props.onTechStackSubmit({ techStack: techStack});
        this.setState({ techStack: ''});
    }
    render() {
        return (
            <form className="techStackForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Please enter list of key words separating them with a space"
                    value={this.state.techStack}
                    onChange={this.handleTechStackChange}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
}

class TestOutput extends React.Component {
    render() {
        return (
            <p>{this.props.writeResult}</p>
            );
    }
}

