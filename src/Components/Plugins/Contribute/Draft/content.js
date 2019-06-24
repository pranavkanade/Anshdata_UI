import React, { Component } from "react";
import css from "./content.scss";

import {
  ModuleCardDraft,
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
    const AddModuleBtn = (
      <div className={css.moduleBtn}>
        <img src="../../../../../static/assets/icon/add_circle_outline_24px_outlined.svg" />
        <span>Add New Module</span>
      </div>
    );
    const Modules = this.state.modules.map(mod => {
      return (
        <>
          <ModuleCardDraft
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

    return (
      <div className={css.moduleList}>
        {AddModuleBtn}
        {Modules}
      </div>
    );
  };

  render() {
    return (
      <div className={css.courseContent}>
        <span className={css.sectionTitle}>Modules</span>
        {this.renderModulesList()}
      </div>
    );
  }
}

export default CourseContent;
