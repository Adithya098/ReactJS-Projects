import {calculateInvestmentResults,formatter} from '../util/investment.js'

export default function Results({input}) 
{
    let result1=calculateInvestmentResults({...input});
    console.log("result:",result1);
    const initialInvestment=result1[0].valueEndOfYear - result1[0].interest - result1[0].annualInvestment;
    return (
        <table id='result'>
            <thead>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th> 
            </thead>
            <tbody>
                {result1.map((value, index) => {
                    
                    const totalinterest= value.valueEndOfYear-(value.annualInvestment*value.year)-initialInvestment;
                    const totalAmountInvested = value.valueEndOfYear - totalinterest;

                    return (
                        <tr key={index}>
                        <td>{value.year}</td>
                        <td>{formatter.format(value.valueEndOfYear)}</td>
                        <td>{formatter.format(value.interest)}</td>
                        <td>{formatter.format(totalinterest)}</td>
                        <td>{formatter.format(totalAmountInvested)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
);
}