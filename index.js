import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.form = null;
        this.frame = null;
    }

    componentDidMount() {
        if (this.frame)
            ReactDOM.findDOMNode(this.frame).addEventListener('load', this.handleLoad.bind(this), false);
    }

    handleUpload() {
        if (this.form)
            ReactDOM.findDOMNode(this.form).submit();
    }

    handleLoad(event) {
        ReactDOM.findDOMNode(this.form).reset();
        let res = event.target.contentDocument.body.innerText;
        if (res.slice(0, 3) === '###') {
            //error开头以###标识 因为传text以外的会被下载
            this.props.onError(res);
        } else if (res) {
            this.props.onLoad(res);
        }
    }

    render() {
        let { id, url } = this.props;
        return (
            <div>
                <iframe name={`${id}fileUpload`} width="0" height="0" frameBorder="0"
                    id={`${id}iframe`} ref={c => this.frame = c} />
                <form method="post" action={url} id={`${id}form`}
                    encType="multipart/form-data" name={`${id}fileForm`} target={`${id}fileUpload`}
                    ref={c => this.form = c} >
                    <input type="file" name="file" onChange={this.handleUpload.bind(this)} />
                </form>
            </div>
        )
    }
}

Uploader.defaultProps = {
    url: '/',
    id: 'iframe',
    onLoad: () => { },
    onError: () => { }
}
