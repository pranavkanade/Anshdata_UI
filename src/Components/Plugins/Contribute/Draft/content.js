import React, { Component } from "react";
import css from "./content.scss";

import {
  ModuleCardMd,
  DetailedModuleCard
} from "../../../Generic/Cards/ModuleCard";

class CourseContent extends Component {
  state = {
    modules: this.props.modules,
    activeModule: 0
  };

  closeSelectedModule = () => {
    this.setState({ activeModule: 0 });
  };

  setSelectedModule = id => {
    this.setState({ activeModule: id });
  };

  renderModulesList = () => {
    return this.state.modules.map(mod => {
      return (
        <>
          <ModuleCardMd
            module={mod}
            key={mod.id}
            select={this.setSelectedModule}
          />
          {this.state.activeModule === mod.id ? (
            <DetailedModuleCard
              module={mod}
              key={`detailed_${mod.id}`}
              close={this.closeSelectedModule}
            />
          ) : null}
        </>
      );
    });
  };

  render() {
    return (
      <div className={css.courseContent}>
        <span className={css.sectionTitle}>Modules</span>
        <div className={css.moduleList}>{this.renderModulesList()}</div>
      </div>
    );
  }
}

export default CourseContent;
