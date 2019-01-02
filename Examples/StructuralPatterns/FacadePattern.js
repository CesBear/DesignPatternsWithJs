/**
 * Explanation:
 *
 * Hide away complexity by creating a facade for the complex code.
 *
 *
 * if you are React Developer you been using facade EVERYDAY.
 * When you create a component you are creating a module of that component reducing the
 * complexity and leverage a single line the render of that component
 *
 *
 * THE LINE 52 is the Facade example, when in a single line is calling another component
 * for example in code below you create a component, en in line 52 you are calling another component leverage into another component and
 * making sure the code is simplified in another component you are using Facade pattern *
 * */

import React, { Component } from 'react';
import NewSingle from './NewSingle';
import Error from './Error';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            error: false,
        };
    }

    componentDidMount() {
        const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=3c5c8f726f4f4d87a352e63017c68eb0`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    news: data.articles
                })
            })
            .catch((error) => {
                this.setState({
                    error: true
                })
            });
    }

    renderItems() {
        if (!this.state.error) {
            return this.state.news.map((item) => (
                <NewSingle key={item.url} item={item} />
        ));
        } else {
            return <Error />
        }
    }

    render() {
        return (
            <div className="row">
            {this.renderItems()}
            </div>
    );
    }
}

export default News;
