import React, {FormEvent} from 'react';
import * as PropTypes from 'prop-types';
import v4 from 'uuid/v4';
import {Collection} from "../../models/collection";

class CreateCollectionForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      name: '',
      description: '',
      emoji: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(fieldName: string, event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [fieldName as string]: event.target.value } as StateTypes);
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { onCreateCollection } = this.props;
    const { name, description, emoji } = this.state;

    onCreateCollection({
      id: v4(),
      name,
      description,
      emoji,
    });

    this.resetFrom();
  }

  resetFrom() {
    this.setState({
      name: '',
      description: '',
      emoji: '',
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={(e) => this.handleChange('name', e)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={(e) => this.handleChange('description', e)}
            />
          </label>
          <label>
            Emoji:
            <input
              type="text"
              name="emoji"
              value={this.state.emoji}
              onChange={(e) => this.handleChange('emoji', e)}
            />
          </label>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default CreateCollectionForm;

type PropTypes = {
  onCreateCollection: (data: Collection) => void
}

type StateTypes = {
  name: string
  description: string
  emoji: string
}