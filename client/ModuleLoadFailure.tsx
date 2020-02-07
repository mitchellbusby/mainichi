import * as React from 'react';

const ModuleLoadFailure = ({
  moduleName
}) => (
  <div className="module-load-failure p2">
    {moduleName} failed to load
  </div>
);

export {ModuleLoadFailure};
