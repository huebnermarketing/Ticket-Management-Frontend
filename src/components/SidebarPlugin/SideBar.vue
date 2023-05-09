<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link nav-link-icon" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown>
                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" src="img/theme/team-1.jpg">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Settings</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Activity</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Support</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a href="#!" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </a>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                <!--Heading-->
                <h6 class="navbar-heading text-muted">Documentation</h6>
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <a class="nav-link"
                           href="//learning-lab/bootstrap-vue/alerts/argon-dashboard">
                            <i class="ni ni-spaceship"></i> Getting started
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="//learning-lab/bootstrap-vue/colors/argon-dashboard">
                            <i class="ni ni-palette"></i> Foundation
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="//learning-lab/bootstrap-vue/alerts/argon-dashboard">
                            <i class="ni ni-ui-04"></i> Components
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>


.vertical-layout {
  &.vertical-menu-modern {
    .main-menu {
      svg{
        stroke: #FF9F43 !important;
        outline: #FF9F43 !important;
      }
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), background 0s;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      .navigation {
        li a {
          align-items: center;
        }
        > li > a svg,
        > li > a i {
          height: 20px;
          width: 20px;
          font-size: 1.45rem;
          margin-right: 1.1rem;
          flex-shrink: 0;
        }
        // Sub-menu icon size
        .menu-content {
          > li > a svg,
          > li > a i {
            margin-right: 1.45rem;
            font-size: 11px;
            height: 11px;
            width: 11px;
          }
        }
      }
    }

    //Vertical menu [Expanded]
    &.menu-expanded {
      // Main menu expanded
      .main-menu {
        // width: $menu-expanded-width;
        .navigation {
          .navigation-header {
            .feather-more-horizontal {
              display: none;
            }
          }
          > li {
            > a {
              > i,
              > svg {
                &:before {
                  height: 20px;
                  width: 20px;
                  font-size: 1.45rem;
                }
              }
            }
          }
          li {
            // @include vertical-menu-has-sub-arrow($font-size-base + 0.1);
          }
        }
      }
      //Content expanded
      .footer {
        // @include main-menu-width($menu-expanded-width);
      }
    }
    //Vertical menu [Collapsed]
    &.menu-collapsed {
      //Navbar collapsed
      .navbar {
        svg{
          stroke: #FF9F43 !important;
          outline: #FF9F43 !important;
        }
        .navbar-header {
          // @include menu-navbar-width($menu-collapsed-width);
          .modern-nav-toggle {
            display: none;
          }
          &.expanded {
            // width: $menu-expanded-width;
            z-index: 1000;
            .modern-nav-toggle {
              display: block;
            }
          }
        }
        // fixed-top navbar when menu-collapsed
        &.fixed-top {
          // left: $menu-collapsed-width;
        }
      }
      // Main menu collapsed
      .main-menu {
        // width: $menu-collapsed-width;

        .navbar-header .brand-text,
        .modern-nav-toggle {
          display: none;
        }

        // When menu is collapsed and mouse is not hovered over menu
        &:not(.expanded) {
          .navigation-header {
            margin-left: 2.2rem;
            span {
              display: none;
            }
            .feather-more-horizontal {
              display: block;
              font-size: 1.285rem;
              width: 18px;
              height: 18px;
            }
          }
          .navigation li {
            &:last-child {
              margin-bottom: 1.25rem !important;
            }
            &.active {
              a {
                background: whitesmoke;
                box-shadow: none;
                color: #565656;
              }
            }
          }
        }

        // When menu is collapsed but mouse is hovered over menu
        &.expanded {
          // width: $menu-expanded-width;
          .navigation {
            > li.navigation-header {
              span {
                display: block;
              }
              .feather-more-horizontal {
                display: none;
              }
            }
            li {
              @include vertical-menu-has-sub-arrow(1rem);
            }
          }
          .navbar-header .brand-text {
            display: inline;
          }
          .modern-nav-toggle {
            display: block;
          }
        }

        //Navigation collapsed
        .navigation {
          overflow: visible;
          > li.navigation-header {
            span {
              display: none;
            }
          }
          > li {
            > a {
              text-overflow: inherit;
            }
          }
        }
      }
      //Brand center content collapsed
      .app-content,
      .footer {
        // @include main-menu-width($menu-collapsed-width);
      }
      .header-navbar {
        // Floating-navbar
        &.floating-nav {
          width: calc(100vw - (100vw - 100%) - 4.4rem - 74px);
        }
        // Navbar-static-top
        &.navbar-static-top {
          width: calc(100vw - (100vw - 100%) - 74px);
          left: 74px;
        }
      }
    }

    .toggle-icon,
    .collapse-toggle-icon {
      margin-right: 0.425rem;
      &:focus {
        outline: none;
      }
    }
  }
}

// Initially menu & content width for lg and up screen
@include media-breakpoint-up(lg) {
  .vertical-layout {
    &.vertical-menu-modern {
      .main-menu {
        // width: $menu-expanded-width;
      }
    }
  }
}

// Initially menu & content width for md and down screen
@include media-breakpoint-down(lg) {
  .vertical-layout {
    &.vertical-menu-modern {
      // not using this class in below < 992
      .main-menu {
        width: 0;
      }
      .navbar {
        .navbar-header {
          width: 0;
        }
      }
      .content,
      .footer {
        @include main-menu-width(0);
      }
      &.menu-collapsed {
        .app-content,
        .footer {
          margin-left: 0;
        }
        .main-menu {
          width: 0;
        }
      }
    }
  }
}

// Initially menu & content width for sm and down screen
@include media-breakpoint-down(sm) {
  .vertical-layout {
    &.vertical-menu-modern {
      // not using this class <992
      .main-menu {
        width: 0;
      }
      .navbar {
        .navbar-header {
          width: 0;
        }
      }
      .content,
      .footer {
        @include main-menu-width(0);
      }
    }
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
// IE Specific CSS
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .vertical-menu-modern.vertical-layout .main-menu .navigation > li > a > span {
    animation: none;
  }
}

</style>
