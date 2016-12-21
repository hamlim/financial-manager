import React from 'react';
import Header from './src/components/header';
import {render} from 'react-dom';


if (document.body.getAttribute('data-page') === "app") {
  render(<Header activeLinkClass="is-app" />, document.getElementById('headerMount'));
} else if (document.body.getAttribute('data-page') === "analysis") {
  render(<Header activeLinkClass="is-analysis" />, document.getElementById('headerMount'));
} else if (document.body.getAttribute('data-page') === "budgets") {
  render(<Header activeLinkClass="is-budgets" />, document.getElementById('headerMount'));
} else if (document.body.getAttribute('data-page') === "settings") {
  render(<Header activeLinkClass="is-settings" />, document.getElementById('headerMount'));
}