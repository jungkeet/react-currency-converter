import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Converter = () => {
    const [currencyList, setCurrencyList] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('default');
    const [toCurrency, setToCurrency] = useState('default');
    const [inputAmount, setInputAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');

    const fetchCurrencyList = () => {
        axios
            .get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_6NGbOHMMWiGhP4HcdS3EyUzPfR1oetsvTgpCNmHz`)
            .then((response) => {
                const currencyOptionList = Object.keys(response.data.data);
                setCurrencyList(currencyOptionList);
            })
            .catch((error) => {
                console.error('Error fetching currency list:', error);
            });
    };

    useEffect(() => {
        fetchCurrencyList();
    }, []);

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputAmount(event.target.value);
    };

    useEffect(() => {
        if (fromCurrency !== '' && toCurrency !== '' && inputAmount !== '') {
            axios
                .get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_6NGbOHMMWiGhP4HcdS3EyUzPfR1oetsvTgpCNmHz&base_currency=${fromCurrency}&currencies=${toCurrency}`)
                .then((response) => {
                    const exchangeRate = Object.values(response.data.data);
                    const result = inputAmount * exchangeRate;
                    setConvertedAmount(result.toFixed(2));
                })
                .catch((error) => {
                    console.error('Error converting currencies:', error);
                });
        } else {
            setConvertedAmount('');
        }
    }, [fromCurrency, toCurrency, inputAmount]);

    return (
        <Box className="Converter"
            sx={{
                width: 500,
                height: 300,
                backgroundColor: '#f5f5f5',
                borderRadius: 3,
                boxShadow: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" fontWeight="300" gutterBottom>
                Currency Converter
            </Typography>
            <Box className="fromCurrencyWrapper"
                sx={{
                    display: 'flex',
                }}
            >
                <Box className="fromWrapper"
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { width: 150 },
                        padding: 2,
                    }}
                >
                    <TextField
                        name="fromCurrency"
                        select
                        label="From"
                        color="secondary"
                        defaultValue=""
                        onChange={handleFromCurrencyChange}
                    >
                        {currencyList.map((currency) => (
                            <MenuItem key={currency} value={currency}>
                                {currency}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box className="inputAmountWrapper"
                    sx={{
                        padding: 2,
                    }}
                >
                    <TextField
                        id="input"
                        label="Amount"
                        variant="outlined"
                        type="number"
                        color="secondary"
                        value={inputAmount}
                        onChange={handleInputChange}
                    />
                </Box>
            </Box>
            <Box className="toCurrencyWrapper"
                sx={{
                    display: 'flex',
                }}
            >
                <Box className="toWrapper"
                    sx={{
                        '& .MuiTextField-root': { width: 150 },
                        padding: 2,
                    }}
                >
                    <TextField
                        name="toCurrency"
                        select
                        label="To"
                        color="secondary"
                        defaultValue=""
                        onChange={handleToCurrencyChange}
                    >
                        {currencyList.map((currency) => (
                            <MenuItem key={currency} value={currency}>
                                {currency}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box className="outputAmountWrapper"
                    sx={{
                        padding: 2,
                    }}
                >
                    <TextField
                        id="output"
                        variant="outlined"
                        placeholder="0.00"
                        color="secondary"
                        value={convertedAmount}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Converter;