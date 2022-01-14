import React from 'react'

const withDialog = (WrappedComponent) => {
  class WithDialog extends React.Component {
    constructor() {
      super()
      this.state = {
        open: false,
      }
      this.handleSkemaOpen = this.handleSkemaOpen.bind(this)
      this.handleSkemaClose = this.handleSkemaClose.bind(this)
    }

    handleSkemaOpen = () => {
      this.setState({ open: true })
    }

    handleSkemaClose = () => {
      this.setState({ open: false })
    }

    render() {
      return (
        <WrappedComponent
          open={this.state.open}
          handleSkemaOpen={this.handleSkemaOpen}
          handleSkemaClose={this.handleSkemaClose}
        />
      )
    }
  }

  return WithDialog
}

export default withDialog
