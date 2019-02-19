import * as React from 'react'

// 这里为了实现将 state 的获取与更新归到各个模块中
import current from '../module'

interface IProps {
  text?: string
  clickTest?: () => void
}

function testView(props: IProps) {
  return (
    <div>
      <div>ssssssss</div>
      <button onClick={props.clickTest}>click</button>
    </div>
  )
}

export default current
  .connect(
    testView
    // class TestView extends React.Component<IProps> {
    //   public render() {
    //     // tslint:disable-next-line:no-console
    //     console.log(current.getState())

    //     return (
    //       <div>
    //         <div>ssssssss</div>
    //         <button onClick={this.props.clickTest}>click</button>
    //       </div>
    //     )
    //   }
    // }
  )
  .mapProps<IProps>(ownProps => {
    return {
      clickTest: () => {
        alert('aaa')
        return
      },
      text: current.getState().demo.text
    }
  })({})
