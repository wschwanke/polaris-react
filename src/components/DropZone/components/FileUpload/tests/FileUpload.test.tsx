import * as React from 'react';
import {Link, Icon, Button, Caption, TextStyle} from 'components';
import {mountWithAppProvider} from 'test-utilities';
import {DropZoneContext} from 'components/DropZone/types';
import {Provider} from '../../Context';
import FileUpload from '../FileUpload';

describe('<FileUpload />', () => {
  it('renders large view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'large', type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find('img')).toHaveLength(1);
    expect(fileUpload.find(Button)).toHaveLength(1);
    expect(fileUpload.find(TextStyle)).toHaveLength(1);
  });

  it('renders medium view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'medium', type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Link)).toHaveLength(1);
    expect(fileUpload.find(Caption)).toHaveLength(1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'small', type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Icon)).toHaveLength(1);
  });

  it('sets a default actionTitle if the prop is provided then removed', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'large', type: 'file'}}>
        <FileUpload actionTitle="Title" />
      </Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(fileUpload.find(Button).text()).toBe('Add file');
  });

  it('sets a default actionHint if the prop is provided then removed', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'large', type: 'file'}}>
        <FileUpload actionHint="Hint" />
      </Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(fileUpload.find(TextStyle).text()).toBe('or drop files to upload');
  });
});
