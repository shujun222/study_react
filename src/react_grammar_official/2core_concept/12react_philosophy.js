import React from 'react';
import './12react_philosopyh.css';


class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return(
            <tr>
                <th colSpan="2">{category}</th>
            </tr>
        );
    }
}


class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked?
            product.name:
            <span style={{color: 'red'}}> {product.name} </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}


class ProductTable extends React.Component {
    render() {
        const rows = [];
        // 统计这个作甚？
        let lastCategory = null;
        const chooseStocked = this.props.searchProps.inStockOnly;
        const filterText = this.props.searchProps.filterText.toLowerCase();


        this.props.products.forEach((product) => {
            // 勾选了checkbox && 此条记录本身不是stocked，则跳过
            if ((chooseStocked && !product.stocked) 
                    || product.name.toLowerCase().indexOf(filterText)===-1 ){
                // continue;
                return;
            }

            // 1. 筛选出种类，
            // 这样的写法又bug呀，这得要求相同的category记录必须全部在一起，数据返回得order by category
            // 不过也不得不佩服这种取巧的写法，如果数据随意，要把category插入其中还是很费劲的
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }

            // 2. 正常循环，列举中商品价格; key属性在子组件ProductRow中不渲染，只是为了消除console警告
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            );
            lastCategory = product.category;
        });

        // 返回表格
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}


class SearchBar extends React.Component {
    render() {
        const searchProps = this.props.searchProps;

        return (
        <form>
            <input type="text" placeholder="Search..." 
                value={searchProps.filterText} 
                onChange={this.props.inputFilterText}/>
            <p>
                <label>
                    <input type="checkbox" 
                        checked={searchProps.inStockOnly} 
                        onChange={this.props.chooseCheckbox} />
                    Only show products in stock
                </label>
            </p>
        </form>
        );
    }
}


export default class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterText: '', inStockOnly: true};
    }

    chooseCheckbox = () => {
        this.setState({
            inStockOnly: !this.state.inStockOnly
        });
    }

    inputFilterText = (event)=> {
        this.setState({filterText: event.target.value});
    }

    render() {
        const searchProps = this.state;
        return (
        <div>
            <SearchBar searchProps={searchProps} 
                inputFilterText={this.inputFilterText} 
                chooseCheckbox={this.chooseCheckbox}
                />
            <ProductTable products={PRODUCTS} searchProps={searchProps} />
        </div>
        );
    }
}

  
// 数据结构不好，应该定义为树形
const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];