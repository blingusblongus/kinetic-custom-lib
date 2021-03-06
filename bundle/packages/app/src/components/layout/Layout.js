import React from 'react';
import classNames from 'classnames';

export const Layout = ({
  authenticated,
  sidebar,
  header,
  main,
  classNames: classes = {},
  sidebarRef,
  headerRef,
  bodyRef,
  asideRef,
  mobile,
  sidebarOpen,
  toggleSidebar,
  resizeAside,
  toggleAside,
  asideWidth,
}) => {
  return (
    <div className="app-wrapper">
      {!!sidebar &&
        authenticated && (
          <nav
            className={classNames('app-sidebar', {
              closed: !mobile && sidebarOpen === -1,
              closing: !mobile && sidebarOpen === 0,
              open: mobile && sidebarOpen > 0,
            })}
            ref={sidebarRef}
          >
            {sidebar}
          </nav>
        )}

      <div
        className={classNames('app-body', classes.body)}
        ref={bodyRef}
        onClick={
          mobile && !!sidebar && sidebarOpen > 0 ? toggleSidebar : undefined
        }
      >
        {!!header && (
          <header
            className={classNames('app-header', classes.header)}
            ref={headerRef}
            style={
              asideWidth && !mobile
                ? { marginRight: `-${asideWidth[1]}px` }
                : undefined
            }
          >
            {header}
          </header>
        )}

        <main
          className={classNames('app-main', classes.main)}
          style={
            asideWidth && !mobile
              ? { marginRight: `-${asideWidth[1]}px` }
              : undefined
          }
        >
          {main}
        </main>
      </div>
      <aside
        className="app-aside"
        id="app-aside"
        ref={asideRef}
        style={
          asideWidth && !mobile
            ? { flexBasis: `${asideWidth[0]}px` }
            : undefined
        }
      >
        <div className="controls" onMouseDown={resizeAside}>
          <button
            className="aside-toggle"
            aria-label="Toggle Aside"
            onClick={toggleAside}
            onMouseDown={e => e.stopPropagation()}
          >
            <span className="fa fa-chevron-right" />
          </button>
        </div>
      </aside>
    </div>
  );
};
