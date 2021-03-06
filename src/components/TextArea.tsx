import * as React from 'react';
import { Handler } from './Base';

type TextAreaValueType = string | string[] | number;
export interface TextAreaState {
    value: TextAreaValueType;
}

export type TextAreaAttribute = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export class TextArea extends React.Component<TextAreaAttribute & Handler<TextAreaValueType>, TextAreaState> {
    state: TextAreaState;
    errorMsg: string = '请提供数据';

    constructor(props: TextAreaAttribute) {
        super(props);
        this.state = {value: props.value || ''};
    }
    render() {
        // tslint:disable-next-line:no-shadowed-variable
        let { className= 'vma-area', watchValue, onChange, validator, ...others} = this.props;
        onChange = this.onChange;
        return (
            <textarea className={className} {...others} onChange={onChange} value={this.state.value}/>
        );
    }

    onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({value: event.target.value}, () => {
            if (this.props.watchValue && this.state.value !== undefined) {
                this.props.watchValue(this.props.name || '', this.state.value, false);
            }
            if (this.props.validator) {
                this.props.validator(
                    this.props.name || '', 
                    this.state.value, 
                    this.validator(), 
                    this.errorMsg);
            }                       
        });
    }

    private validator = (): boolean => {
        let valid: boolean = true;
        if (typeof this.state.value === 'string') {
            this.errorMsg = '';
            let value = this.state.value.length;
            if (this.props.minLength !== undefined && (isNaN(value) || value < this.props.minLength)) {
                this.errorMsg = `非法的文本,最短:${this.props.minLength}`;
                valid = valid && false;
            }
            if (this.props.maxLength !== undefined && (isNaN(value) || value > this.props.maxLength)) {
                valid = valid && false;
                if (this.errorMsg.length === 0) {
                    this.errorMsg += `非法的文本, 最长: ${this.props.maxLength}`;
                } else {
                    this.errorMsg += `, 最长: ${this.props.maxLength}`;
                }
            }
        }
        return valid;        
    }
}
