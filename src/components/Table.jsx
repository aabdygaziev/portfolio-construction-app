function Table({ stats }){
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(stats[0]).map(key => {
            return <th>{key}</th>
          })}
        </tr>
      </thead>
      <tbody>
          {stats.map(stock => {
            return (
              <tr>
                <td>{stock.ticker}</td>
                <td>{stock.meanReturn}</td>
                <td>{stock.variance}</td>
                <td>{stock.yMean}</td>
                <td>{stock.yVariance}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  );
}

export default Table;