import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

import RSQuiz from './RSQuiz';
import UglyFunctional from './uglyFunctional';

export default class KnowledgeBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1'
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div style={{"margin":"5px"}}>
        <Nav tabs className="knowledge-tabs navigation" >
          <NavItem className="knowledge-tabs item">
            <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
            >
            Prettier
            </NavLink>
          </NavItem>

          <NavItem className="knowledge-tabs item">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Ugly but Functional
            </NavLink>
          </NavItem>

        </Nav>

        <TabContent 
          activeTab={this.state.activeTab}
          className="knowledge-tabs content"
          >
          <TabPane tabId="1">
            <RSQuiz />
          </TabPane>

          <TabPane tabId="2">
            <UglyFunctional />
          </TabPane>
        </TabContent>

      </div>
    );
  }
}