import React from 'react';

/**
 * 本例子不会更新，因为PureComponent种的 shouldComponentUpdate进行的浅比较
 * 而this.props.words是一个数组，改变数组内的东西并不影响指针地址本身
 */
class ListOfWords extends React.PureComponent {
// class ListOfWords extends React.Component {
    render() {
        return <div>{this.props.words.join(',')}</div>;
    }
}

export default class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // 这部分代码很糟，而且还有 bug
        const words = this.state.words;
        words.push('marklar');
        this.setState({ words: words });

        //改正办法，深层copy
        // this.setState({words: [...this.state.words, 'marklar']});
        // this.setState(state => ({
        //     words: [...state.words, 'marklar'],
        // }));

        // this.setState({ words: this.state.words.concat("marklar")});

    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Click me</button> 
                <ListOfWords words={this.state.words} />
            </div>
        );
    }
}