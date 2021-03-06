import { getBroker } from '../../src';
import * as traderepublic from '../../src/brokers/traderepublic';
import {
  allSamples,
  buySamples,
  sellSamples,
  dividendSamples,
} from './__mocks__/traderepublic';

describe('Broker: Trade Republic', () => {
  let consoleErrorSpy;

  describe('Check all documents', () => {
    test('Can the document parsed with Trade Republic', () => {
      allSamples.forEach(sample => {
        expect(traderepublic.canParseData(sample)).toEqual(true);
      });
    });

    test('Can identify a broker from the document as Trade Republic', () => {
      allSamples.forEach(sample => {
        expect(getBroker(sample)).toEqual(traderepublic);
      });
    });
  });

  describe('Validate buys', () => {
    test('Map a limit order correctly', () => {
      const activity = traderepublic.parseData(buySamples[0]);

      expect(activity).toEqual({
        broker: 'traderepublic',
        type: 'Buy',
        date: '2020-02-24',
        isin: 'US88160R1014',
        company: 'Tesla Inc.',
        shares: 3,
        price: 768.1,
        amount: 2304.3,
        fee: 1,
        tax: 0,
      });
    });

    test('Map a market order correctly', () => {
      const activity = traderepublic.parseData(buySamples[1]);

      expect(activity).toEqual({
        broker: 'traderepublic',
        type: 'Buy',
        date: '2019-11-29',
        isin: 'GB00B03MLX29',
        company: 'Royal Dutch Shell',
        shares: 382,
        price: 26.14,
        amount: 9985.48,
        fee: 1,
        tax: 0,
      });
    });

    test('Map a limit order with financial transaction tax correctly', () => {
      const activity = traderepublic.parseData(buySamples[2]);

      expect(activity).toEqual({
        broker: 'traderepublic',
        type: 'Buy',
        date: '2020-06-09',
        isin: 'FR0000031122',
        company: 'Air France-KLM S.A.',
        shares: 100,
        price: 5.632,
        amount: 563.2,
        fee: 1,
        tax: 1.69,
      });
    });

    test('Map a market order without explicit ISIN correctly', () => {
      const activity = traderepublic.parseData(buySamples[3]);

      expect(activity).toEqual({
        broker: 'traderepublic',
        type: 'Buy',
        date: '2019-07-19',
        isin: 'DE000SHL1006',
        company: 'Siemens Healthineers AG',
        shares: 14,
        price: 35.7,
        amount: 499.8,
        fee: 1,
        tax: 0,
      });
    });

    test('Map a saving plan order correctly', () => {
      const activity = traderepublic.parseData(buySamples[4]);

      expect(activity).toEqual({
        broker: 'traderepublic',
        type: 'Buy',
        date: '2020-01-16',
        isin: 'IE00B1YZSC51',
        company: 'iShsII-Core MSCI Europe U.ETF',
        shares: 1.3404,
        price: 26.111608475082065,
        amount: 35.0,
        fee: 0,
        tax: 0,
      });
    });
  });

  describe('Validate sells', () => {
    test('Map a limit sell order correctly: Tesla', () => {
      const activity = traderepublic.parseData(sellSamples[0]);

      expect(activity).toEqual({
        amount: 2550,
        broker: 'traderepublic',
        company: 'Tesla Inc.',
        date: '2020-02-04',
        fee: 1,
        isin: 'US88160R1014',
        price: 850.0,
        shares: 3,
        tax: 36.47,
        type: 'Sell',
      });
    });

    test('Map a limit sell order correctly: Stryker', () => {
      const activity = traderepublic.parseData(sellSamples[1]);

      expect(activity).toEqual({
        amount: 16723.08,
        broker: 'traderepublic',
        company: 'Stryker Corp.',
        date: '2020-07-21',
        fee: 1,
        isin: 'US8636671013',
        price: 168.92,
        shares: 99,
        tax: 52.97,
        type: 'Sell',
      });
    });
  });

  describe('Validate dividends', () => {
    test('Should map the pdf data correctly for: Royal Dutch Shell', () => {
      const activity = traderepublic.parseData(dividendSamples[0]);

      expect(activity).toEqual({
        amount: 118.21,
        broker: 'traderepublic',
        company: 'Royal Dutch Shell',
        date: '2020-03-23',
        fee: 0,
        isin: 'GB00B03MLX29',
        price: 0.3094502617801047,
        shares: 382,
        tax: 17.94,
        type: 'Dividend',
      });
    });

    test('Should map the pdf data correctly for: iSh.ST.Eur.Sel.Div.30 U.ETF DE', () => {
      const activity = traderepublic.parseData(dividendSamples[1]);

      expect(activity).toEqual({
        amount: 9.67,
        broker: 'traderepublic',
        company: 'iSh.ST.Eur.Sel.Div.30 U.ETF DE',
        date: '2020-07-15',
        fee: 0,
        isin: 'DE0002635299',
        price: 0.21995569041520902,
        shares: 43.9634,
        tax: 2.2,
        type: 'Dividend',
      });
    });

    test('Should map the pdf data correctly for: iSh.EO ST.Sel.Div.30 U.ETF DE', () => {
      const activity = traderepublic.parseData(dividendSamples[2]);

      expect(activity).toEqual({
        amount: 8.34,
        broker: 'traderepublic',
        company: 'iSh.EO ST.Sel.Div.30 U.ETF DE',
        date: '2020-07-15',
        fee: 0,
        isin: 'DE0002635281',
        price: 0.19105128604546745,
        shares: 43.6532,
        tax: 1.89,
        type: 'Dividend',
      });
    });

    test('Should map the pdf data correctly for: iShsII-Dev.Mkts Prop.Yld U.ETF', () => {
      const activity = traderepublic.parseData(dividendSamples[3]);

      expect(activity).toEqual({
        amount: 17.52,
        broker: 'traderepublic',
        company: 'iShsII-Dev.Mkts Prop.Yld U.ETF',
        date: '2020-02-26',
        fee: 0,
        isin: 'IE00B1FZS350',
        price: 0.12425531914893617,
        shares: 141,
        tax: 6.81,
        type: 'Dividend',
      });
    });
  });

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });
});
